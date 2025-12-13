import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email({ message: "Format email wymagany" }),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
