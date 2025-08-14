import { Hono } from "hono";

const app = new Hono()
  .get("/", (ctx) => {
    return ctx.json({ test: "test" });
  })
  .get("/:name", (ctx) => {
    const param = ctx.req.param("name");
    return ctx.json({ name: param });
  });

export default app;
