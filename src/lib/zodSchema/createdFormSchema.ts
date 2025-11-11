// import { z } from "zod";

// export const createdFormSchema = (inputs: any[]) => {
//   const shape: Record<string, any> = {};

//   // console.log("", inputs);

//   inputs.forEach((input) => {
//     if (!input.required) return;

//     const fieldName = input.header;

//     switch (input.type) {
//       case "checkbox":
//         shape[fieldName] = z
//           .record(z.boolean())
//           .refine(
//             (obj) => Object.values(obj).some((v) => v),
//             "Wybierz co najmniej jedną opcję"
//           );
//         break;

//       case "singleSelect":
//         shape[fieldName] = z
//           .string()
//           .nullable()
//           .refine((val) => val !== null && val !== "", "Wybierz jedną opcję");
//         break;

//       default:
//         shape[fieldName] = z
//           .string()
//           .trim()
//           .min(2, "Wpisz co najmniej 2 znaki");
//         break;
//     }
//   });

//   return Object.keys(shape).length === 0
//     ? z.object({}).passthrough()
//     : z.object(shape);
// };

// import { z } from "zod";

// export const createdFormSchema = (inputs: any[]) => {
//   const shape: Record<string, any> = {};

//   inputs.forEach((input) => {
//     const fieldName = input.header;
//     // if (!input.required) return;

//     switch (input.type) {
//       case "checkbox":
//         shape[fieldName] = input.required
//           ? z
//               .record(z.boolean())
//               .refine(
//                 (obj) => Object.values(obj).some((v) => v),
//                 "Wybierz co najmniej jedną opcję"
//               )
//           : z.record(z.boolean()).optional();
//         break;

//       case "singleSelect":
//         shape[fieldName] = input.required
//           ? z.string().min(1, "Wybierz jedną opcję")
//           : z.string().optional();
//         break;

//       default:
//         shape[fieldName] = input.required
//           ? z.string().trim().min(1, "Wpisz co najmniej 1 znak")
//           : z.string().optional();
//         break;
//     }
//   });

//   return z.object(shape);
// };

import { z } from "zod";

export const createdFormSchema = (inputs: any[]) => {
  const shape: Record<string, any> = {};

  inputs.forEach((input) => {
    if (!input.required) return;

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
          : z.record(z.boolean()).optional().nullable(); // ⬅️ pozwala na {} / undefined / null
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
