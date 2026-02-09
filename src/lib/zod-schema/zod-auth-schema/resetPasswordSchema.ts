import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().trim().min(8, { message: "Min. 8 znaków" }),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Powtórz hasło",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
