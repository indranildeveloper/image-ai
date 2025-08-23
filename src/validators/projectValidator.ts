import { z } from "zod";

export const projectSchema = z.object({
  projectId: z.string(),
});

export const projectsQuerySchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
});
