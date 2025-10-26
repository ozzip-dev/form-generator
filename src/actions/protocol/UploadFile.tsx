"use server";

import { db } from "@/lib/mongo";
import { addProtocol } from "@/services/protocol-service";
import { Binary } from "mongodb";

export async function UploadFile(file: File): Promise<void> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { name, size, type, lastModified } = file;

  await addProtocol(db, {
    createdAt: new Date(),
    name,
    size,
    type,
    lastModifiedAt: new Date(lastModified),
    uploadedAt: new Date(),
    data: new Binary(buffer),
  });
}
