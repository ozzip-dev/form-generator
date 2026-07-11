import { InputType } from "@/enums";
import { findById, update, updateById } from "@/lib/mongo";
import { Form } from "@/types/form";
import { FormInput, FormOption, Input } from "@/types/input";
import { Db, ObjectId, WithId } from "mongodb";
import { getFormById } from "./form-service";
import { inputHasOther, isInputWithOptions } from "@/helpers/inputHelpers";
import { isValidPesel } from "@/helpers/helpers-validation/input-types";

function getFormInputById(inputs: FormInput[], id: string): FormInput {
  const input = inputs.find((el: FormInput) => el.id == id!);

  if (!input) throw new Error(`Input not found: ${id}`);

  return input;
}

async function decreaseRemainingInputsOrder(
  db: Db,
  formId: ObjectId,
  inputId: string,
) {
  const form = await findById<Form>(db, "form", formId);
  if (!form) throw new Error("Invalid form id");

  const { inputs } = form;
  const startingOrder: number | undefined = getFormInputById(
    form.inputs,
    inputId!,
  )?.order;
  /* if order is undefined/null or is last element. We have no inputs to update */
  if (startingOrder == undefined || startingOrder >= inputs.length - 1) return;
  const remainingOrders = inputs
    .sort((a, b) => a.order - b.order)
    .map(({ order }) => order)
    .filter((order) => order > startingOrder);

  for (const order of remainingOrders) {
    await update<Form>(
      db,
      "form",
      {
        _id: form._id,
        "inputs.order": order,
      },
      {
        $inc: {
          "inputs.$.order": -1,
        },
      },
    );
  }
}

export async function removeInputFromDraft(
  db: Db,
  formId: ObjectId,
  inputId: string,
): Promise<WithId<Form>> {
  /* all inputs higher than removed one get their order decreased by 1 */
  await decreaseRemainingInputsOrder(db, formId, inputId);

  return (await updateById<Form>(db, "form", formId, {
    $pull: {
      inputs: { id: inputId },
    },
    $set: {
      updatedAt: new Date(),
    },
  })) as WithId<Form>;
}

export async function moveInputUp(
  db: Db,
  formId: ObjectId,
  inputId: string,
): Promise<WithId<Form> | undefined> {
  const form = await findById<Form>(db, "form", formId);
  if (!form) throw new Error("Invalid form id");

  const { inputs } = form;
  const updatedOrder: number | undefined = getFormInputById(
    inputs,
    inputId!,
  )?.order;
  /* if order is undefined/null or 0. We can't move up input with index 0 */
  if (!updatedOrder) return;

  const previousOrder = updatedOrder - 1;

  await update<Form>(
    db,
    "form",
    {
      _id: form._id,
      "inputs.order": previousOrder,
    },
    {
      $inc: {
        "inputs.$.order": 1,
      },
    },
  );

  await update<Form>(
    db,
    "form",
    {
      _id: form._id,
      "inputs.id": inputId,
    },
    {
      $inc: {
        "inputs.$.order": -1,
      },
      $set: {
        updatedAt: new Date(),
      },
    },
  );

  const updatedForm = await findById<Form>(db, "form", formId);
  return updatedForm!; /* we check earlier if form exists */
}

export async function moveInputDown(
  db: Db,
  formId: ObjectId,
  inputId: string,
): Promise<WithId<Form> | undefined> {
  const form = await findById<Form>(db, "form", formId);
  if (!form) throw new Error("Invalid form id");

  const { inputs } = form;
  const updatedOrder: number | undefined = getFormInputById(
    inputs,
    inputId!,
  )?.order;
  /* if order is undefined/null or is last element. We can't move down last input */
  if (updatedOrder == undefined || updatedOrder >= inputs.length - 1) return;

  const nextOrder = updatedOrder + 1;

  await update(
    db,
    "form",
    {
      _id: form._id,
      "inputs.order": nextOrder,
    },
    {
      $inc: {
        "inputs.$.order": -1,
      },
    },
  );

  await update(
    db,
    "form",
    {
      _id: form._id,
      "inputs.id": inputId,
    },
    {
      $inc: {
        "inputs.$.order": 1,
      },
      $set: {
        updatedAt: new Date(),
      },
    },
  );

  const updatedForm = await findById<Form>(db, "form", formId);
  return updatedForm!; /* we check earlier if form exists */
}

export async function toggleRequired(
  db: Db,
  formId: ObjectId,
  inputId: string,
): Promise<void> {
  const form = (await findById(db, "form", formId)) as Form;
  const input: FormInput = getFormInputById(form.inputs, inputId);

  await update<Form>(
    db,
    "form",
    {
      _id: form._id,
      "inputs.id": inputId,
    },
    {
      $set: {
        "inputs.$.required": !input.required,
        updatedAt: new Date(),
      },
    },
  );
}

export async function toggleUnique(
  db: Db,
  formId: ObjectId,
  inputId: string,
): Promise<void> {
  const form = (await findById(db, "form", formId)) as Form;
  const input: FormInput = getFormInputById(form.inputs, inputId);

  const updateData = {
    "inputs.$.unique": !input.unique,
    updatedAt: new Date(),
  };

  await update<Form>(
    db,
    "form",
    {
      _id: form._id,
      "inputs.id": inputId,
    },
    {
      $set: !input.unique
        ? {
            ...updateData,
            "inputs.$.required": true,
          }
        : updateData,
    },
  );
}

export async function toggleHidden(
  db: Db,
  formId: ObjectId,
  inputId: string,
): Promise<void> {
  const form = (await findById(db, "form", formId)) as Form;
  const input: FormInput = getFormInputById(form.inputs, inputId);

  const updateData = {
    "inputs.$.hidden": !input.hidden,
    updatedAt: new Date(),
  };

  await update<Form>(
    db,
    "form",
    {
      _id: form._id,
      "inputs.id": inputId,
    },
    {
      $set: !input.hidden
        ? {
            ...updateData,
            "inputs.$.required": true,
            "inputs.$.unique": true,
          }
        : updateData,
    },
  );
}

function verifyAddedAcceptedValues(
  values: (string | number)[],
  inputType: InputType,
): void {
  const invalidValues: (string | number)[] = [];
  const validateFn: (val: string | number) => boolean =
    inputType === InputType.NUMBER
      ? (val) => typeof val === "number" && Number.isFinite(val)
      : inputType === InputType.PESEL
        ? (val) => Number.isFinite(val) && isValidPesel(val as number)
        : (val) => typeof val === "string";

  for (const value of values) {
    if (!validateFn(value)) invalidValues.push(value.toString());
  }
  if (invalidValues.length) throw new Error(invalidValues.join(";"));
}

export async function addAcceptedValues(
  db: Db,
  formId: ObjectId,
  inputId: string,
  values: (string | number)[],
): Promise<{
  newValues: (string | number)[];
  duplicatedValues: (string | number)[];
}> {
  const form = (await findById(db, "form", formId)) as Form;
  const input: FormInput = getFormInputById(form.inputs, inputId);
  const { type, acceptedValues = [] } = input;

  verifyAddedAcceptedValues(values, type);

  const valuesNoDuplicates = [...new Set(values)];
  const newValues = valuesNoDuplicates.filter(
    (val) => !acceptedValues.includes(val),
  );
  const duplicatedValues = valuesNoDuplicates.filter((val) =>
    acceptedValues.includes(val),
  );

  await update<Form>(
    db,
    "form",
    {
      _id: form._id,
      "inputs.id": inputId,
    },
    {
      $addToSet: {
        "inputs.$.acceptedValues": {
          $each: newValues,
        },
      },
      $set: {
        updatedAt: new Date(),
      },
    },
  );

  return {
    newValues,
    duplicatedValues,
  };
}

export async function removeAcceptedValue(
  db: Db,
  formId: ObjectId,
  inputId: string,
  value: string | number,
): Promise<void> {
  const form = (await findById(db, "form", formId)) as Form;
  const input: FormInput = getFormInputById(form.inputs, inputId);
  const { acceptedValues = [] } = input;

  if (!acceptedValues.includes(value)) {
    throw new Error(`Accepted value not found: ${value}`);
  }

  await update<Form>(
    db,
    "form",
    {
      _id: form._id,
      "inputs.id": inputId,
    },
    {
      $pull: {
        "inputs.$.acceptedValues": value,
      },
      $set: {
        updatedAt: new Date(),
      },
    },
  );
}

export async function addSubmittedValue(
  db: Db,
  formId: ObjectId,
  inputId: string,
  value: string | number,
): Promise<void> {
  await update<Form>(
    db,
    "form",
    {
      _id: formId,
      "inputs.id": inputId,
    },
    {
      $addToSet: {
        "inputs.$.submittedValues": value,
      },
      $set: {
        updatedAt: new Date(),
      },
    },
  );
}

export async function updateFormInputTexts(
  db: Db,
  formId: ObjectId,
  inputId: string,
  data: { header?: string; description?: string },
): Promise<void> {
  const form = (await findById(db, "form", formId)) as Form;
  const { header, description } = data;

  const updateData: any = {};
  if (header !== undefined) updateData["inputs.$.header"] = header;
  if (description !== undefined)
    updateData["inputs.$.description"] = description;

  await update<Form>(
    db,
    "form",
    {
      _id: form._id,
      "inputs.id": inputId,
    },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
  );
}

export async function updateFormInputType(
  db: Db,
  formId: ObjectId,
  inputId: string,
  type?: InputType,
): Promise<void> {
  if (!type) return;

  let updateObject: {
    "inputs.$.type": InputType;
    updatedAt: Date;
    "inputs.$.options"?: FormOption[];
  } = {
    "inputs.$.type": type,
    updatedAt: new Date(),
  };

  if (!isInputWithOptions({ type } as Input)) {
    updateObject = {
      ...updateObject,
      "inputs.$.options": [],
    };
  }

  await update(
    db,
    "form",
    { _id: formId, "inputs.id": inputId },
    {
      $set: updateObject,
    },
  );
}

export async function checkInputHasOtherOption(
  formId: string,
  inputId: string,
): Promise<boolean> {
  const { inputs } = await getFormById(formId);
  const input = getFormInputById(inputs, inputId);
  return inputHasOther(input);
}
