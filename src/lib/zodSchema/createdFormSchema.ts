import { z } from "zod";

export const createdFormSchema = (inputs: any[]) => {
  const shape: Record<string, any> = {};

  inputs.forEach((input) => {
    const fieldName = input.id;

    switch (input.type) {
      case "text":
        shape[fieldName] = input.required
          ? z.string().trim().min(1, "Min. 1 znak").max(60, "Maks. 60 znaków")
          : z.string().optional();
        break;
      case "superText":
        shape[fieldName] = input.required
          ? z
              .string()
              .trim()
              .min(1, "Min. 1 znak")
              .max(2000, "Maks. 2000 znaków")
          : z.string().optional();
        break;

      case "number":
        shape[fieldName] = input.required
          ? z.string().trim().regex(/\d/, "Min. 1 cyfra")
          : z.string().optional();
        break;

      case "checkbox":
        if (input.required) {
          shape[fieldName] = z.record(z.string()).superRefine((obj, ctx) => {
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
          });
        } else {
          shape[fieldName] = z
            .record(z.union([z.boolean(), z.string()]))
            .optional();
        }
        break;

      case "singleSelect":
        shape[fieldName] = input.required
          ? z
              .string()
              .trim()
              .nullable()
              .superRefine((value, ctx) => {
                if (!value || value === "") {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Min. jedna opcja wymagana",
                  });
                  return;
                }

                if (value.length < 2) {
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
              })
          : z.string().nullable().optional();

        break;

      case "email":
        shape[fieldName] = input.required
          ? z
              .string()
              .trim()
              .email("Format email")
              .nullable()
              .refine(
                (value) => value !== null && value !== "",
                "Pole wymagane",
              )
          : z.string().optional();
        break;

      case "date":
        shape[fieldName] = input.required
          ? z
              .string()
              .trim()
              .nullable()
              .refine((val) => !isNaN(Date.parse(val!)), "Data")
          : z.string().optional();
        break;

      default:
        shape[fieldName] = input.required
          ? z.string().trim().min(1, "Pole wymagane")
          : z.string().trim().optional();
        break;
    }
  });

  return z.object(shape);
};
