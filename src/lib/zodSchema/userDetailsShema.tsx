import { z } from "zod";

export const userDetailsSchema = z.object({
  committeeUnion: z
    .string()
    .trim()
    .min(5, "Min. 2 znaki")
    .max(200, "Max. 200 znaków"),
  committeeName: z
    .string()
    .trim()
    .min(5, "Min. 2 znaki")
    .max(200, "Max. 200 znaków"),
  committeePhone: z
    .string()
    .trim()
    .min(8, { message: "Min. 8 znaków" })
    .refine(
      (value) => /^(\+48)?\s?\d{3}[\s-]?\d{3}[\s-]?\d{3}$/.test(value),
      "Nieprawidłowy numer telefonu"
    ),
  committeeEmail: z.string().trim().email({ message: "Format email" }),
});

export type UserDetailsSchema = z.infer<typeof userDetailsSchema>;
