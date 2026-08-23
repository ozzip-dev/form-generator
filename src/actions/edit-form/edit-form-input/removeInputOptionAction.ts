"use server";

import { db, findById, updateById } from "@/lib/mongo";
import { requireUser } from "@/services/user-service";
import { Form } from "@/types/form";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

const removeInputOptionAction = async (
  formIdString: string,
  inputId: string,
  optionName: string,
): Promise<void> => {
  const index: number = Number(optionName.split(".")[1]);
  const formId = new ObjectId(formIdString);

  await requireUser();

  await db.collection<Form>("form").updateOne(
    { _id: formId, "inputs.id": inputId },
    {
      $unset: { [`inputs.$.options.${index}`]: "" },
    },
  );

  await db
    .collection<Form>("form")
    .updateOne(
      { _id: formId, "inputs.id": inputId },
      { $pull: { "inputs.$.options": undefined } },
    );

  revalidateTag(`form-${formId}`);
};

export default removeInputOptionAction;
