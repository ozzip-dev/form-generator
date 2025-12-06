"use server";

import { insertFile } from "@/services/file-service";
import { Binary } from "mongodb";

export async function uploadFileAction(uploadedFile: File): Promise<any> {
  const arrayBuffer = await uploadedFile.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { name, size, type, lastModified } = uploadedFile;
  const file = await insertFile({
    name,
    size,
    type,
    lastModifiedAt: new Date(lastModified),
    uploadedAt: new Date(),
    data: new Binary(buffer),
  });

  return file;
}
