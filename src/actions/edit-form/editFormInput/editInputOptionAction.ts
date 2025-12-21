"use server";

import {
  handleServerErrors,
  ModelFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";
import { OPTION_OTHER } from "@/helpers/inputHelpers";
import { db, updateById } from "@/lib/mongo";
import { makeId } from "@/lib/utils";
import { editInputFormSchema } from "@/lib/zodSchema/editFormSchemas/editFormInputSchema";
import { getFormById } from "@/services/form-service";
import { checkInputHasOtherOption } from "@/services/input-service";
import { requireUser } from "@/services/user-service";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

// export const editInputOptionAction = async (
//   formIdString: string,
//   inputId: string,
//   inputLabel: string,
//   inputName: string,
//   isCurrentOptionOther: boolean
// ): Promise<void | { validationErrors: ModelFieldErrors }> => {
//   await requireUser();

//   const formId = new ObjectId(formIdString);
//   const form = await getFormById(formId.toString());
//   const input = form.inputs.find(({ id }) => id === inputId);

//   if (!input) return;

//   const optionIndex = Number(inputName.split(".")[1]);

//   const dataToValidate = input.options.map((option, idx) =>
//     idx === optionIndex ? { ...option, label: inputLabel } : option
//   );

//   const validationResult = editInputFormSchema.partial().safeParse({
//     options: dataToValidate,
//   });

//   if (!validationResult.success) {
//     return { validationErrors: handleServerErrors(validationResult.error) };
//   }

//   let options = [...input.options];
//   const hasOptionOther = await checkInputHasOtherOption(formIdString, inputId);

//   if (isCurrentOptionOther && hasOptionOther) {
//     throw new Error("Opcja 'Inne' już istnieje");
//   }

//   console.log("inputName", inputName);

//   const newOption = {
//     value: isCurrentOptionOther ? OPTION_OTHER : makeId(inputId),
//     label: inputLabel,
//   };

//   if (hasOptionOther && !options[optionIndex]) {
//     console.log("1");

//     const otherIndex = options.findIndex(
//       (option) => option.value === OPTION_OTHER
//     );
//     options.splice(otherIndex, 0, newOption);
//   } else if (hasOptionOther && isCurrentOptionOther) {
//     console.log("2");

//     options[optionIndex] = {
//       ...(options[optionIndex] as any),
//       label: inputLabel,
//     };
//   } else if (hasOptionOther && optionIndex === options.length - 1) {
//     console.log("3");
//     const otherIndex = options.findIndex(
//       (option) => option.value === OPTION_OTHER
//     );

//     options.splice(otherIndex, 0, newOption);
//   } else if (inputName === OPTION_OTHER) {
//     console.log("4");

//     options.push(newOption);
//   } else if (options[optionIndex]) {
//     console.log("5");
//     options[optionIndex] = {
//       ...options[optionIndex],
//       label: inputLabel,
//     };
//   } else {
//     console.log("6");
//     options.push(newOption);
//   }

//   const mappedInputs = form.inputs.map((inp) =>
//     inp.id === inputId ? { ...inp, options: options } : inp
//   );

//   await updateById(db, "form", formId, {
//     $set: { inputs: mappedInputs },
//   });

//   if (inputName === OPTION_OTHER) revalidateTag(`form-${formId}`);
// };

export const editInputOptionAction = async (
  formIdString: string,
  inputId: string,
  inputLabel: string,
  inputName: string,
  isCurrentOptionOther: boolean
): Promise<void | { validationErrors: ModelFieldErrors }> => {
  await requireUser();

  const formId = new ObjectId(formIdString);
  const form = await getFormById(formId.toString());
  const input = form.inputs.find((i) => i.id === inputId);
  if (!input) return;

  const optionIndex = Number(inputName.split(".")[1]);

  const dataToValidate = input.options.map((option, idx) =>
    idx === optionIndex ? { ...option, label: inputLabel } : option
  );

  const validationResult = editInputFormSchema.partial().safeParse({
    options: dataToValidate,
  });

  if (!validationResult.success) {
    return { validationErrors: handleServerErrors(validationResult.error) };
  }

  const options = [...input.options];

  const hasOptionOther = await checkInputHasOtherOption(formIdString, inputId);

  const isEdit =
    (!hasOptionOther && !!options[optionIndex]) ||
    (hasOptionOther && isCurrentOptionOther);

  console.log("isEdit", isEdit);

  const newOption = {
    value: isCurrentOptionOther ? OPTION_OTHER : makeId(inputId),
    label: inputLabel,
  };

  if (isEdit) {
    options[optionIndex] = {
      ...options[optionIndex],
      label: inputLabel,
    };
  } else {
    if (hasOptionOther) {
      const otherIndex = options.findIndex(
        (option) => option.value === OPTION_OTHER
      );
      options.splice(otherIndex, 0, newOption);
    } else {
      options.push(newOption);
    }
  }

  const mappedInputs = form.inputs.map((inp) =>
    inp.id === inputId ? { ...inp, options } : inp
  );

  await updateById(db, "form", formId, {
    $set: { inputs: mappedInputs },
  });

  if (inputName === OPTION_OTHER) revalidateTag(`form-${formId}`);
};
