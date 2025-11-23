"use server";

import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { checkFormHasInputWithId } from "../../utils";
import { updateFormInputType } from "@/services/input-service";
import { InputType } from "@/enums/input";
import { requireUser } from "@/services/queries/requireUser";
import { runAsyncAction } from "@/helpers/runAsyncFunction";

export async function editInputTypeAction(
  formIdString: string,
  inputId: string,
  type: InputType
): Promise<void> {
  await requireUser();
  const formId = new ObjectId(formIdString);
  checkFormHasInputWithId(db, formId, inputId)

  const performEditInputType = async () => {
    await updateFormInputType(db, formId, inputId, type);
    revalidateTag(`form-${formId}`);
  };

  await runAsyncAction(performEditInputType);
}
