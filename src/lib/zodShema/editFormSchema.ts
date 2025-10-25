import { z } from "zod";
export const inputItemSchema = z.object({
  header: z
    .string()
    .min(2, { message: "Min. 2 litery" })
    .max(20, { message: "Max. 20 liter" })
    .optional(),
  type: z.string().nonempty({ message: "Wymagane" }),
  required: z.boolean().optional(),
});

const conditionalInputSchema = inputItemSchema.refine(
  (data) => {
    if (data.type === "text") {
      return data.header && data.header.length >= 2 && data.header.length <= 20;
    }
    return true;
  },
  {
    message: "Dla pola typu 'text' wymagane są min. 2 znaki",
    path: ["header"],
  }
);

export const editFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Min. 2 litery" })
    .max(20, { message: "Max. 20 liter" }),
  description: z
    .string()
    .min(2, { message: "Min. 2 litery" })
    .max(60, { message: "Max. 60 liter" }),
  type: z.string().nonempty({ message: "Wymagane" }),
  inputs: z.array(conditionalInputSchema).optional(),
});

export type EditFormSchema = z.infer<typeof editFormSchema>;
