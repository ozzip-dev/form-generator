import { z } from "zod";

export const createdFormSchema = (inputs: any[]) => {
  const shape: Record<string, any> = {};

  inputs.forEach((input) => {
    const fieldName = input.header;

    switch (input.type) {
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

      default:
        shape[fieldName] = input.required
          ? z.string().trim().min(1, "Pole wymagane")
          : z.string().optional();
        break;
    }
  });

  return z.object(shape);
};
