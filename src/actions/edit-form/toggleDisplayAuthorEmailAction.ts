"use server";

import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { requireUser } from "@/services/user-service";
import { toggleDisplayAuthorEmail } from "@/services/form-service";

export async function toggleDisplayAuthorEmailAction(
  formIdString: string,
): Promise<void> {
  await requireUser();

  const formId = new ObjectId(formIdString);

  await toggleDisplayAuthorEmail(formId);

  revalidateTag(`form-${formId}`);
}
