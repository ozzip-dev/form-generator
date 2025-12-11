"use server";

import { addFileToProtocol } from "@/services/protocol-service";
import { ProtocolFileCategory } from "@/types/protocol";
import { revalidateTag } from "next/cache";

export async function addProtocolFile({
  protocolId,
  fileId,
  fileCategory,
}: {
  protocolId: string;
  fileId: string;
  fileCategory: ProtocolFileCategory;
}): Promise<void> {
  try {
    await addFileToProtocol({
      protocolId,
      fileId,
      fileCategory,
    });

    revalidateTag("protocols");
  } catch (_) {
    // Delete files? If yes, trigger proper action
    throw new Error("Failed to add file to protocol");
  }
}
