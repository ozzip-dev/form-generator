import { z } from "zod";

export const editFormHeaderSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 litery" })
    .max(100, { message: "Maks. 100 liter" }),
  description: z.string().trim().max(3000, { message: "Maks. 3000 liter" }),
  type: z.string().trim().nonempty({ message: "Podaj kateogorię formularza" }),
  resultVisibility: z
    .string()
    .trim()
    .nonempty({ message: "Podaj tryb wyników" }),
  displayAuthorEmail: z.boolean(),
});

export type EditFormHeaderSchema = z.infer<typeof editFormHeaderSchema>;
