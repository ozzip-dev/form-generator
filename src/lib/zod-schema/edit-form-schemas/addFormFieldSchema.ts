import { z } from "zod";

export const addFormFieldSchema = z.object({
  type: z.string().nonempty({ message: "Wymagane" }),
});

export type AddFormFieldSchema = z.infer<typeof addFormFieldSchema>;
