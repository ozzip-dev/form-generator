"use server";

import { db } from "@/lib/mongo";
import { findById } from "@/lib/mongo";
import { serializeProtocol } from "@/lib/serialize-utils";
import { Protocol, ProtocolSerialized } from "@/types/protocol";
import { ObjectId } from "mongodb";

export async function getProtocolDetails(protocolId: string): Promise<ProtocolSerialized | null> {
  try {
    const protocol = await findById<Protocol>(db, "protocol", new ObjectId(protocolId));
    if (!protocol) throw new Error('Invalid protocol id')
    return serializeProtocol(protocol);
  } catch (error) {
    console.error("Error fetching protocol details:", error);
    return null;
  }
}
