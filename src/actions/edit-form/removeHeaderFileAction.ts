"use server";

import { removeFormHeaderFile } from "@/services/form-service";
import { revalidateTag } from "next/cache";

export async function removeHeaderFileAction(formId: string): Promise<void> {
  try {
    await removeFormHeaderFile(formId);

    revalidateTag(`form-${formId}`);
  } catch (_) {
    // Delete files? If yes, trigger proper action
    throw new Error("Failed to remove form header file");
  }
}
