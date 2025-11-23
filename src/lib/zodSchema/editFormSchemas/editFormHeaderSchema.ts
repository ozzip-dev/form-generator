import { z } from "zod";

export const editFormHeaderSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 litery" })
    .max(20, { message: "Max. 20 liter" }),
  description: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 litery" })
    .max(60, { message: "Max. 60 liter" }),
  type: z.string().nonempty({ message: "Wymagane" }),
});

export type EditFormHeaderSchema = z.infer<typeof editFormHeaderSchema>;
