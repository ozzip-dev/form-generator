"use server";

import { addFormHeaderFile } from "@/services/form-service";
import { revalidateTag } from "next/cache";

export async function addHeaderFileAction(
  formId: string,
  fileId: string
): Promise<void> {
  try {
    await addFormHeaderFile(formId, fileId);

    revalidateTag(`form-${formId}`);
  } catch (_) {
    // Delete files? If yes, trigger proper action
    throw new Error("Failed to add form header file");
  }
}
