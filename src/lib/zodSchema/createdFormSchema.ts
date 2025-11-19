import { z } from "zod";

export const createdFormSchema = (inputs: any[]) => {
  const shape: Record<string, any> = {};

  inputs.forEach((input) => {
    const fieldName = input.id;

    switch (input.type) {
      case "text":
        shape[fieldName] = input.required
          ? z.string().trim().min(2, "Min. 2 znaki").max(60, "Maks. 60 znaków")
          : z.string().optional();
        break;
      case "superText":
        shape[fieldName] = input.required
          ? z
            .string()
            .trim()
            .min(2, "Min. 2 znaki")
            .max(200, "Maks. 200 znaków")
          : z.string().optional();
        break;

      case "number":
        shape[fieldName] = input.required
          ? z.string().trim().regex(/\d/, "Min. 1 cyfra")
          : z.string().optional();
        break;

      case "checkbox":
        shape[fieldName] = input.required
          ? z
            .record(z.boolean())
            .refine(
              (obj) => obj && Object.values(obj).some((v) => v),
              "Wybierz co najmniej jedną opcję"
            )
          : z.record(z.boolean()).optional();
        break;

      case "singleSelect":
        shape[fieldName] = input.required
          ? z
            .string()
            .nullable()
            .refine(
              (val) => val !== null && val !== "",
              "Wybierz jedną opcję"
            )
          : z.string().nullable().optional();
        break;

      case "email":
        shape[fieldName] = input.required
          ? z
            .string()
            .email("Podaj format email")
            .nullable()
            .refine((val) => val !== null && val !== "", "Pole wymagane")
          : z.string().optional();
        break;

      case "date":
        shape[fieldName] = input.required
          ? z
            .string()
            .nullable()
            .refine((val) => !isNaN(Date.parse(val!)), "Podaj datę")
          : z.string().optional();
        break;

      default:
        shape[fieldName] = input.required
          ? z.string().trim().min(1, "Pole wymagane")
          : z.string().optional();
        break;
    }
  });

  return z.object(shape);
};
