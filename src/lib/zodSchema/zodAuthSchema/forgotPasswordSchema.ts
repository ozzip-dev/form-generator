import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Format email wymagany" }),
});

export type TForgotPasswordShema = z.infer<typeof forgotPasswordSchema>;
