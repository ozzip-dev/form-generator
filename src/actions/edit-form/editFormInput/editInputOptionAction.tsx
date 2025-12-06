"use server";

import {
  handleServerErrors,
  ModelFieldErrors,
} from "@/helpers/helpersValidation/handleFormErrors";
import { db, updateById } from "@/lib/mongo";
import { makeId } from "@/lib/utils";
import { editInputFormSchema } from "@/lib/zodSchema/editFormSchemas/editFormInputSchema";
import { getFormById } from "@/services/form-service";
import { checkInputHasOtherOption } from "@/services/input-service";
import { requireUser } from "@/services/user-service";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

const editInputOptionAction = async (
  formIdString: string,
  inputId: string,
  inputLabel: string,
  inputName: string
): Promise<void | { error: ModelFieldErrors }> => {
  await requireUser();

  console.log("inputLabel", inputLabel);
  console.log("inputName", inputName);

  const formId = new ObjectId(formIdString);
  const form = await getFormById(formId.toString());
  const input = form.inputs.find(({ id }) => id === inputId);

  if (!input) return;

  const optionIndex = Number(inputName.split(".")[1]);

  const dataToValidate = input.options.map((opt, idx) =>
    idx === optionIndex ? { ...opt, label: inputLabel } : opt
  );

  console.log("dataToValidate", dataToValidate);

  const validationResult = editInputFormSchema.partial().safeParse({
    options: dataToValidate,
  });

  if (!validationResult.success) {
    return { error: handleServerErrors(validationResult.error) };
  }

  let mappedOptions = [...input.options];

  const optionValue = inputName === "other" ? "other" : makeId(inputId);

  if (!mappedOptions[optionIndex]) {
    await checkInputHasOtherOption(formIdString, inputId);
    mappedOptions.push({ value: optionValue, label: inputLabel });
  } else {
    mappedOptions[optionIndex] = {
      ...mappedOptions[optionIndex],
      label: inputLabel,
    };
  }

  const mappedInputs = form.inputs.map((inp) =>
    inp.id === inputId ? { ...inp, options: mappedOptions } : inp
  );

  await updateById(db, "form", formId, {
    $set: { inputs: mappedInputs },
  });

  revalidateTag(`form-${formId}`);
};

export default editInputOptionAction;

// "use server";

// import {
//   handleServerErrors,
//   ModelFieldErrors,
// } from "@/helpers/helpersValidation/handleFormErrors";
// import { db, updateById } from "@/lib/mongo";
// import { editInputFormSchema } from "@/lib/zodSchema/editFormSchemas/editFormInputSchema";
// import { getFormById } from "@/services/form-service";
// import { checkInputHasOtherOption } from "@/services/input-service";
// import { requireUser } from "@/services/user-service";
// import { ObjectId } from "mongodb";
// import { revalidateTag } from "next/cache";

// const editInputOptionAction = async (
//   formIdString: string,
//   inputId: string,
//   optionValue: string,
//   inputValue: string
// ): Promise<void | { error: ModelFieldErrors }> => {
//   await requireUser();

//   console.log("inputValue", inputValue);
//   console.log("optionValue", optionValue);
//   const formId = new ObjectId(formIdString);
//   const form = await getFormById(formId.toString());
//   const { inputs } = form;
//   const { options } = inputs.find(({ id }) => id == inputId)!;

//   const validationResult = editInputFormSchema.partial().safeParse({ options });

//   if (!validationResult.success) {
//     return { error: handleServerErrors(validationResult.error) };
//   }

//   const editedOption = options.find(({ value }) => value == inputValue);

//   let mappedOptions = options;

//   if (!editedOption) {
//     // TODO: opcja znika, potrzeba zrobic refresh karty
//     await checkInputHasOtherOption(formIdString, inputId);

//     mappedOptions.push({ value: inputValue, label: optionValue });
//   } else {
//     mappedOptions = options.map((option, i) => {
//       if (option.value != inputValue) return option;
//       return {
//         ...option,
//         label: optionValue,
//       };
//     });
//   }

//   const mappedInputs = inputs.map((input) => {
//     if (input.id != inputId) return input;
//     return {
//       ...input,
//       options: mappedOptions,
//     };
//   });

//   await updateById(db, "form", formId, {
//     $set: {
//       inputs: [...mappedInputs],
//     },
//   });

//   revalidateTag(`form-${formId}`);
// };

// export default editInputOptionAction;
