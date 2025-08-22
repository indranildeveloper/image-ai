import { z } from "zod";

export const projectSchema = z.object({
  projectId: z.string(),
});
