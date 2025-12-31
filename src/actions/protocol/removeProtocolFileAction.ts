"use server";

import { isProtocolAuthor } from "@/helpers/protocolHelpers";
import { db, findById } from "@/lib/mongo";
import { removeFile } from "@/services/file-service";
import { removeFileFromProtocol } from "@/services/protocol-service";
import { requireUser } from "@/services/user-service";
import { Protocol, ProtocolFileCategory } from "@/types/protocol";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function removeProtocolFileAction(
  protocolId: string,
  fileId: string,
  fileCategory: ProtocolFileCategory
): Promise<void> {
  try {
    const user = await requireUser();
    const protocol = await findById<Protocol>(
      db,
      "protocol",
      new ObjectId(protocolId)
    );

    if (!protocol) throw new Error("Invalid id, protocol not found");
    if (!isProtocolAuthor(user, protocol))
      throw new Error("Only author can delete files from protocol");

    await removeFileFromProtocol({
      protocolId,
      fileId,
      fileCategory,
    });

    const { deletedCount } = await removeFile(fileId);

    if (!deletedCount) throw new Error("Invalid id, file not deleted");

    revalidateTag("protocols");
  } catch (_) {
    throw new Error("Failed to remove file from protocol");
  }
}
