import { z } from "zod";

export const protocolFormSchema = z.object({
  branch: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 znaki" })
    .max(100, { message: "Maks. 100 znaków" }),
  workplaceName: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 znaki" })
    .max(100, { message: "Maks. 100 znaków" }),
  tradeUnionName: z
    .string()
    .trim()
    .min(2, { message: "Min. 2 znaki" })
    .max(100, { message: "Maks. 100 znaków" }),
  disputeStartDate: z
    .string()
    .trim()
    .refine((val) => !isNaN(Date.parse(val!)), "Data"),
  demands: z
    .array(z.string().max(100, { message: "Maks. 100 znaków" }))
    .optional(),

  disputeReason: z.record(z.string()).superRefine((obj, ctx) => {
    const values = Object.values(obj).map((v) => v.trim());

    const hasAnyValue = values.some((v) => v.length > 0);

    if (!hasAnyValue) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Min. jedna opcja",
      });
      return;
    }

    values.forEach((value) => {
      if (value.length > 0 && value.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 2,
          type: "string",
          inclusive: true,
          message: "Min. 2 znaki",
        });
      }

      if (value.length > 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 100,
          type: "string",
          inclusive: true,
          message: "Maks. 100 znaków",
        });
      }
    });
  }),
});

export type ProtocolFormSchema = z.infer<typeof protocolFormSchema>;
