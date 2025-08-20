import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(1, { error: "Please enter a name!" }).max(256),
  email: z.email().min(1, { error: "Please enter a valid email!" }).max(256),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters!" })
    .max(256),
});

export type TRegisterFormValidator = z.infer<typeof registerFormSchema>;
