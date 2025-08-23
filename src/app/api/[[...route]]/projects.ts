import { Hono } from "hono";
import { eq, and, desc } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { projects, projectsInsertSchema } from "@/db/schema";
import { db } from "@/db/drizzle";
import {
  projectSchema,
  projectsQuerySchema,
} from "@/validators/projectValidator";

const app = new Hono()
  .get(
    "/",
    verifyAuth(),
    zValidator("query", projectsQuerySchema),
    async (ctx) => {
      const auth = ctx.get("authUser");
      const { page, limit } = ctx.req.valid("query");

      if (!auth.token?.id) {
        return ctx.json(
          {
            error: "Unauthorized!",
          },
          401,
        );
      }

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, auth.token.id))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updatedAt));

      return ctx.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    },
  )
  .get(
    "/:projectId",
    verifyAuth(),
    zValidator("param", projectSchema),
    async (ctx) => {
      const auth = ctx.get("authUser");

      const { projectId } = ctx.req.valid("param");

      if (!auth.token?.id) {
        return ctx.json(
          {
            error: "Unauthorized!",
          },
          401,
        );
      }

      const data = await db
        .select()
        .from(projects)
        .where(
          and(eq(projects.id, projectId), eq(projects.userId, auth.token.id)),
        );

      if (data?.length === 0) {
        return ctx.json(
          {
            error: "Project not found!",
          },
          404,
        );
      }

      return ctx.json({
        data: data[0],
      });
    },
  )
  .post(
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
            error: "Unauthorized!",
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
  )
  .post(
    "/:projectId/duplicate",
    verifyAuth(),
    zValidator("param", projectSchema),
    async (ctx) => {
      const auth = ctx.get("authUser");
      const { projectId } = ctx.req.valid("param");

      if (!auth.token?.id) {
        return ctx.json(
          {
            error: "Unauthorized!",
          },
          401,
        );
      }

      const data = await db
        .select()
        .from(projects)
        .where(
          and(eq(projects.id, projectId), eq(projects.userId, auth.token.id)),
        );

      if (data.length === 0) {
        return ctx.json(
          {
            error: "Project not found!",
          },
          404,
        );
      }

      const project = data[0];

      const duplicateData = await db
        .insert(projects)
        .values({
          name: `Copy of ${project.name}`,
          json: project.json,
          height: project.height,
          width: project.width,
          userId: auth.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (!duplicateData[0]) {
        return ctx.json(
          {
            error: "Something went wrong while copying the project!",
          },
          400,
        );
      }

      return ctx.json({ data: duplicateData[0] });
    },
  )
  .patch(
    "/:projectId",
    verifyAuth(),
    zValidator("param", projectSchema),
    zValidator(
      "json",
      projectsInsertSchema
        .omit({ id: true, userId: true, createdAt: true, updatedAt: true })
        .partial(),
    ),
    async (ctx) => {
      const auth = ctx.get("authUser");
      const { projectId } = ctx.req.valid("param");
      const values = ctx.req.valid("json");

      if (!auth.token?.id) {
        return ctx.json(
          {
            error: "Unauthorized!",
          },
          401,
        );
      }

      const data = await db
        .update(projects)
        .set({ ...values, updatedAt: new Date() })
        .where(
          and(eq(projects.id, projectId), eq(projects.userId, auth.token.id)),
        )
        .returning();

      if (data.length === 0) {
        return ctx.json(
          {
            error: "Unauthorized!",
          },
          401,
        );
      }

      return ctx.json({ data: data[0] });
    },
  );

export default app;
