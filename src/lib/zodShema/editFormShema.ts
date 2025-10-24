import { z } from "zod";

export const editFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Min. 2 litery" })
    .max(20, { message: "Max. 20 liter" }),
  description: z
    .string()
    .min(2, { message: "Min. 2 litery" })
    .max(20, { message: "Max. 20 liter" }),
  type: z.string().nonempty({ message: "Wymagane" }),
});

export type EditFormSchema = z.infer<typeof editFormSchema>;
