import { z } from "zod";

export const setAliasSchema = z.object({
  url: z
    .string()
    .nonempty({ message: "Wymagane" })
    .max(20, { message: "Max. 20 znaków" }),
});

export type SetAliasSchema = z.infer<typeof setAliasSchema>;
