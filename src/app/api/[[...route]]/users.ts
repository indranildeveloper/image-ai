import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { registerFormSchema } from "@/validators/registerFormValidator";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

const app = new Hono().post(
  "/register",
  zValidator("json", registerFormSchema),
  async (ctx) => {
    const { name, email, password } = ctx.req.valid("json");

    const query = await db.select().from(users).where(eq(users.email, email));

    if (query[0]) {
      return ctx.json(
        {
          error: "Invalid credentials!",
        },
        400,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return ctx.json(
      {
        data: {
          message: "User registered successfully!",
        },
      },
      201,
    );
  },
);

export default app;
