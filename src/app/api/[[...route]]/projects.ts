import { Hono } from "hono";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { projects, projectsInsertSchema } from "@/db/schema";
import { db } from "@/db/drizzle";

const app = new Hono().post(
  "/",
  verifyAuth(),
  zValidator(
    "json",
    projectsInsertSchema.pick({
      name: true,
      json: true,
      width: true,
      height: true,
    }),
  ),
  async (ctx) => {
    const auth = ctx.get("authUser");

    const { name, json, height, width } = ctx.req.valid("json");

    if (!auth.token?.id) {
      return ctx.json(
        {
          error: "Unauthorized",
        },
        401,
      );
    }

    const data = await db
      .insert(projects)
      .values({
        name,
        json,
        height,
        width,
        userId: auth.token.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    if (!data[0]) {
      return ctx.json(
        {
          error: "Something went wrong",
        },
        400,
      );
    }

    return ctx.json({ data: data[0] });
  },
);

export default app;
