import { z } from "zod";

export const createdFormSchema = (inputs: any[]) => {
  const shape: Record<string, any> = {};

  // inputs.forEach((input) => {
  //   if (!input.required) return;

  //   switch (input.type) {
  //     case "checkbox":
  //       shape[input.header] = z
  //         .array(z.string())
  //         .min(1, "Wybierz co najmniej jedną opcję");
  //       break;

  //     case "superText":
  //       shape[input.header] = z
  //         .string()
  //         .min(1, `Pole ${input.header} wymagane`);
  //       break;

  //     default:
  //       shape[input.header] = z
  //         .string()
  //         .min(1, `Pole ${input.header} wymagane`);
  //       break;
  //   }
  // });

  return z.object(shape);
};
