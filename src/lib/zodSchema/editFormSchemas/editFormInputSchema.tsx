import { z } from "zod";

export const editInputFormSchema = z
  .object({
    header: z
      .string()
      .trim()
      .min(2, "Min. 2 znaki")
      .max(200, "Max. 200 znaków"),
    description: z
      .string()
      .trim()
      .min(2, "Min. 2 znaki")
      .max(1000, "Max. 1000 znaków"),
    options: z.array(
      z.object({
        // value: z
        //   .string()
        //   .trim()
        //   .min(2, "Min. 2 znaki w opcji")
        //   .max(200, "Maks. 200 znaków w opcji"),
        label: z
          .string()
          .trim()
          .min(2, "Min. 2 znaki w opcji")
          .max(200, "Maks. 200 znaków w opcji"),
      })
    ),
  })
  .passthrough();

export type EditInputFormSchema = z.infer<typeof editInputFormSchema>;
