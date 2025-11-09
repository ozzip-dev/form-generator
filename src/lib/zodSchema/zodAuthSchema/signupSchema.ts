import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(2, { message: "Min. 2 litery" }),
    email: z.string().email({ message: "Format email" }),
    password: z.string().min(8, { message: "Min. 8 znaków" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Powtórz hasło",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
