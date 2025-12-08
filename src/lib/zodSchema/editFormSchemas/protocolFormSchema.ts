import { z } from "zod";

export const protocolFormSchema = z.object({
  productionBranch: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 znaki" })
    .max(6, { message: "Maks. 100 znaków" }),
  companyName: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 znaki" })
    .max(6, { message: "Maks. 100 znaków" }),
  startDate: z
    .string()
    .trim()
    .nullable()
    .refine((val) => !isNaN(Date.parse(val!)), "Data"),
  barganingReason: z
    .record(z.union([z.boolean(), z.string()]))
    .superRefine((obj, ctx) => {
      if (!obj) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Min. jedna opcja",
        });
        return;
      }

      let hasSelection = false;

      Object.entries(obj).forEach(([_, value]) => {
        if (value === true) {
          hasSelection = true;
        }

        if (typeof value === "string") {
          if (value.trim().length === 0) return;

          hasSelection = true;

          if (value.trim().length < 2) {
            ctx.addIssue({
              code: z.ZodIssueCode.too_small,
              minimum: 2,
              type: "string",
              inclusive: true,
              message: "Min. 2 znaki",
            });
          }

          if (value.trim().length > 100) {
            ctx.addIssue({
              code: z.ZodIssueCode.too_big,
              maximum: 100,
              type: "string",
              inclusive: true,
              message: "Maks. 100 znaków",
            });
          }
        }
      });

      if (!hasSelection) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Min. jedna opcja",
        });
      }
    }),
});

export type ProtocolFormSchema = z.infer<typeof protocolFormSchema>;
