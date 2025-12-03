import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, { message: "Min. 2 litery" }),
    email: z.string().trim().email({ message: "Format email" }),
    password: z.string().trim().min(8, { message: "Min. 8 znaków" }),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Powtórz hasło",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
