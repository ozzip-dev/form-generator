import { z } from "zod";

export const editFormHeaderSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 litery" })
    .max(200, { message: "Max. 200 liter" }),
  description: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 litery" })
    .max(2000, { message: "Max. 2000 liter" }),
  type: z.string().nonempty({ message: "Wymagane" }),
});

export type EditFormHeaderSchema = z.infer<typeof editFormHeaderSchema>;
