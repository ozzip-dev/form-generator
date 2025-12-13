"use server";

import { removeFile } from "@/services/file-service";
import { removeFileFromProtocol } from "@/services/protocol-service";
import { ProtocolFileCategory} from "@/types/protocol";
import { revalidateTag } from "next/cache";

export async function removeProtocolFile(
  protocolId: string,
  fileId: string,
  fileCategory: ProtocolFileCategory
): Promise<void> {
  try {
    await removeFileFromProtocol({
      protocolId,
      fileId,
      fileCategory,
      // fileType
    })

    const { deletedCount } = await removeFile(fileId)
    
    if (!deletedCount) throw new Error('Invalid id, file not deleted')

    revalidateTag("protocols");

  } catch(_) {
    throw new Error('Failed to remove file from protocol')
  }
}
