import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import Stripe from "stripe";
import { stripe } from "@/stripe/stripe";
import { db } from "@/db/drizzle";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isSubscriptionActive } from "@/features/subscriptions/utils/utils";

const app = new Hono()
  .get("/current", verifyAuth(), async (ctx) => {
    const auth = ctx.get("authUser");

    if (!auth.token?.id) {
      return ctx.json(
        {
          error: "Unauthorized!",
        },
        401,
      );
    }

    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, auth.token.id));

    const isActive = isSubscriptionActive(subscription);

    return ctx.json({
      data: {
        ...subscription,
        isActive,
      },
    });
  })
  .post("/checkout", verifyAuth(), async (ctx) => {
    const auth = ctx.get("authUser");

    if (!auth.token?.id) {
      return ctx.json(
        {
          error: "Unauthorized!",
        },
        401,
      );
    }

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}?canceled=1`,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: auth.token.email || "",
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      metadata: {
        userId: auth.token.id,
      },
    });

    const url = session.url;

    if (!url) {
      return ctx.json({ error: "Failed to create a payment session!" }, 400);
    }

    return ctx.json({ data: url });
  })
  .post("/billing", verifyAuth(), async (ctx) => {
    const auth = ctx.get("authUser");

    if (!auth.token?.id) {
      return ctx.json(
        {
          error: "Unauthorized!",
        },
        401,
      );
    }

    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, auth.token.id));

    if (!subscription) {
      return ctx.json({ error: "Subscription not found!" }, 404);
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    });

    if (!session.url) {
      return ctx.json({ error: "Failed to create a billing session!" }, 400);
    }

    return ctx.json({ data: session.url });
  })
  .post("/webhook", async (ctx) => {
    const body = await ctx.req.text();
    const signature = ctx.req.header("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (error) {
      return ctx.json(
        { error: `Invalid signature: ${(error as Error).message}` },
        400,
      );
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      if (!session?.metadata?.userId) {
        return ctx.json({ error: "Invalid session!" }, 400);
      }

      await db.insert(subscriptions).values({
        status: subscription.status,
        userId: session.metadata.userId,
        subscriptionsId: subscription.id,
        customerId: subscription.customer as string,
        priceId: subscription.items.data[0].price.product as string,
        currentPeriodEnd: new Date(
          subscription.items.data[0].current_period_end * 1000,
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    if (event.type === "invoice.payment_succeeded") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      if (!session?.metadata?.userId) {
        return ctx.json({ error: "Invalid session!" }, 400);
      }

      await db
        .update(subscriptions)
        .set({
          status: subscription.status,
          currentPeriodEnd: new Date(
            subscription.items.data[0].current_period_end * 1000,
          ),
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.id, subscription.id));
    }

    return ctx.json({ data: "OK" }, 200);
  });

export default app;
