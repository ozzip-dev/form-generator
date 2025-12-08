import { z } from "zod";

export const setAliasSchema = z.object({
  url: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 znaki" })
    .max(20, { message: "Maks. 20 znaków" }),
});

export type SetAliasSchema = z.infer<typeof setAliasSchema>;
