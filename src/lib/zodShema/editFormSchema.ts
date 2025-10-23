import { FormType } from "@/enums/form";
import { z } from "zod";

export const editFormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  type: z.nativeEnum(FormType).optional(),
});

export type EditFormSchema = z.infer<typeof editFormSchema>;