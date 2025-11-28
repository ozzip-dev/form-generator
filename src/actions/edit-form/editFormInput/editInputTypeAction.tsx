"use server";

import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";
import { updateFormInputType } from "@/services/input-service";
import { InputType } from "@/enums/input";
import { requireUser } from "@/services/user-service";

export async function editInputTypeAction(
  formIdString: string,
  inputId: string,
  type: InputType
): Promise<void> {
  await requireUser();
  const formId = new ObjectId(formIdString);
  checkFormHasInputWithId(db, formId, inputId)

  await updateFormInputType(db, formId, inputId, type);
  revalidateTag(`form-${formId}`);
}
