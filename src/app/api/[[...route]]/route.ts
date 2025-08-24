import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import { authConfig } from "@/auth.config";

import ai from "./ai";
import images from "./images";
import users from "./users";
import projects from "./projects";
import subscriptions from "./subscriptions";

// set it ti `edge` if you want to use Edge Runtime
export const runtime = "nodejs";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAuthConfig(ctx: Context): AuthConfig {
  return {
    secret: process.env.AUTH_SECRET,
    ...authConfig,
  };
}

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/ai", ai)
  .route("/images", images)
  .route("/users", users)
  .route("/projects", projects)
  .route("/subscriptions", subscriptions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
