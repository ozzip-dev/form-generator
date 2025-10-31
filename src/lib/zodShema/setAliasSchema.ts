import { z } from "zod";

export const setAliasSchema = z.object({
  url: z.string().nonempty({ message: "Wymagane" }),
});

export type SetAliasSchema = z.infer<typeof setAliasSchema>;
