"use server";

import { isProtocolAuthor } from "@/helpers/protocolHelpers";
import { db, findById } from "@/lib/mongo";
import { removeProtocol } from "@/services/protocol-service";
import { requireUser } from "@/services/user-service";
import { Protocol } from "@/types/protocol";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function removeProtocolAction(protocolId: string): Promise<void> {
  try {
    const user = await requireUser();
    const protocol = await findById<Protocol>(
      db,
      "protocol",
      new ObjectId(protocolId)
    );

    if (!protocol) throw new Error("Invalid id, protocol not found");
    if (!isProtocolAuthor(user, protocol))
      throw new Error("Only author can remove a protocol");

    await removeProtocol({
      protocolId,
    });

    revalidateTag("protocols");
  } catch (_) {
    throw new Error("Failed to remove protocol");
  }
}
