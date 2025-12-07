import { z } from "zod";

const optionSchema = z.object({
  label: z.string().trim().min(2, "Min. 2 znaki").max(200, "Maks. 200 znaków"),
});

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
      .max(1000, "Maks. 1000 znaków"),

    options: z.array(optionSchema).superRefine((options, ctx) => {
      const seen = new Map<string, number>();

      options.forEach((opt, index) => {
        const normalized = opt.label.trim().toLowerCase();

        if (!normalized) return;

        if (seen.has(normalized)) {
          const firstIndex = seen.get(normalized)!;

          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Opcja już istnieje",
            path: [index, "label"],
          });

          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Opcja występuje więcej niż raz",
            path: [firstIndex, "label"],
          });
        } else {
          seen.set(normalized, index);
        }
      });
    }),
  })
  .passthrough();

export type EditInputFormSchema = z.infer<typeof editInputFormSchema>;
