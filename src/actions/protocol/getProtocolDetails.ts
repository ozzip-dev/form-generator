"use server";

import { mapFilesToProtocol } from "@/services/protocol-service";
import { ProtocolWithFilesSerialized } from "@/types/protocol";

export async function getProtocolDetails(protocolId: string): Promise<ProtocolWithFilesSerialized | null> {
  try {
    const protocolWithFiles = await mapFilesToProtocol(protocolId)
    if (!protocolWithFiles) throw new Error('Invalid protocol id')
    return protocolWithFiles

  } catch (error) {
    console.error("Error fetching protocol details:", error);
    return null;
  }
}
