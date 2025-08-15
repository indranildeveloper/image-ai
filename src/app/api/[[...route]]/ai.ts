import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { replicate } from "@/utils/replicate";

const app = new Hono().post(
  "/generate-image",
  zValidator(
    "json",
    z.object({
      prompt: z.string(),
    }),
  ),
  async (ctx) => {
    const { prompt } = ctx.req.valid("json");

    const output: unknown = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          prompt: prompt,
          scheduler: "K_EULER",
        },
      },
    );

    const response = output as Array<string>;

    return ctx.json({
      data: response[0],
    });
  },
);

export default app;
