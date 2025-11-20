import { z } from "zod";

export const editInputFormSchema = z.object({
  header: z.string().trim().min(2, "Min. 2 znaki").max(60, "Maks. 60 znaków"),
  description: z
    .string()
    .trim()
    .min(2, "Min. 2 znaki")
    .max(500, "Maks. 500 znaków")
    .optional()
    .nullable(),
});

export type EditInputFormSchema = z.infer<typeof editInputFormSchema>;
