import { Hono } from "hono";
import { handle } from "hono/vercel";

import user from "./user";

// set it ti `edge` if you want to use Edge Runtime
export const runtime = "nodejs";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/user", user);

export const GET = handle(app);

export type AppType = typeof routes;
