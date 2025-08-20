import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email().min(1, { error: "Please enter a valid email!" }).max(256),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters!" })
    .max(256),
});

export type TLoginFormValidator = z.infer<typeof loginFormSchema>;
