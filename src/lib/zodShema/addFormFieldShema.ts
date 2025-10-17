import { z } from "zod";

export const addFormFieldSchema = z.object({
  header: z.string().nonempty({ message: "Wymagane" }),
  type: z.string().nonempty({ message: "Wymagane" }),
});

export type TAddFormFieldSchema = z.infer<typeof addFormFieldSchema>;
