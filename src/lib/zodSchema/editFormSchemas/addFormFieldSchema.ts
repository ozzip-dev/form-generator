import { z } from "zod";

export const addFormFieldSchema = z.object({
  header: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 znaki" })
    .max(20, { message: "Max. 20 znaków" }),
  type: z.string().nonempty({ message: "Wymagane" }),
});

export type AddFormFieldSchema = z.infer<typeof addFormFieldSchema>;
