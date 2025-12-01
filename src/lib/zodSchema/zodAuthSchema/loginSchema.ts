import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Format email wymagany" }),
  password: z.string().trim().nonempty({ message: "Hasło wymagane" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
