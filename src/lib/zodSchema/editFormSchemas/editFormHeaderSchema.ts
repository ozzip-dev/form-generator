import { z } from "zod";

export const editFormHeaderSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 litery" })
    .max(200, { message: "Maks. 200 liter" }),
  description: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 litery" })
    .max(2000, { message: "Maks. 2000 liter" }),
  type: z.string().trim().nonempty({ message: "Podaj kateogorię formularza" }),
  resultVisibility: z
    .string()
    .trim()
    .nonempty({ message: "Podaj typ widoczności wyników" }),
});

export type EditFormHeaderSchema = z.infer<typeof editFormHeaderSchema>;
