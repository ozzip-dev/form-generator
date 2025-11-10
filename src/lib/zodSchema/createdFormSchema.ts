import { z } from "zod";

export const createdFormSchema = (inputs: any[]) => {
  const shape: Record<string, any> = {};

  inputs.forEach((input) => {
    if (!input.required) return;

    const fieldName = input.header;

    switch (input.type) {
      case "checkbox":
        shape[fieldName] = z
          .record(z.boolean())
          .refine(
            (obj) => Object.values(obj).some((v) => v),
            "Wybierz co najmniej jedną opcję"
          );
        break;

      case "singleSelect":
        shape[fieldName] = z
          .string()
          .nullable()
          .refine((val) => val !== null && val !== "", "Wybierz jedną opcję");
        break;

      default:
        shape[fieldName] = z
          .string()
          .trim()
          .min(2, "Wpisz co najmniej 2 znaki");
        break;
    }
  });

  return Object.keys(shape).length === 0
    ? z.object({}).passthrough()
    : z.object(shape);
};
