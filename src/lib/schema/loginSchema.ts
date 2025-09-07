import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Format email wymagany" }),
  password: z.string().nonempty({ message: "Hasło wymagane" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
