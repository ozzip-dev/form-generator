"use server";

import { addFileToProtocol } from "@/services/protocol-service";
import { ProtocolFileCategory} from "@/types/protocol";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function addProtocolFile({
  protocolId,
  fileId,
  fileCategory,
  // fileType
}: {
  protocolId: string,
  fileId: string,
  fileCategory: ProtocolFileCategory,
  // fileType? :ProtocolFileType
}): Promise<void> {
  try {
    await addFileToProtocol({
    protocolId,
    fileId,
    fileCategory,
    // fileType
})

    revalidateTag("protocols");

  } catch(_) {
    // Delete files? If yes, trigger proper action
    throw new Error('Failed to add file to protocol')
  }
  
  redirect(`/protocols/${protocolId}`);
}
