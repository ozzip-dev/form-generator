"use server";

import { removeLinkFromProtocol } from "@/services/protocol-service";
import { ProtocolAttachmentCategory } from "@/types/protocol";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function removeProtocolLinkAction({
  protocolId,
  link,
  category,
}: {
  protocolId: string;
  link: string;
  category: ProtocolAttachmentCategory;
}): Promise<void> {
  if (!ObjectId.isValid(protocolId)) {
    throw new Error("Invalid protocol id");
  }

  try {
    await removeLinkFromProtocol({
      protocolId,
      link,
      category,
    });

    revalidateTag("protocols");
  } catch (_) {
    throw new Error("Failed to remove link from protocol");
  }
}
