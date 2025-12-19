"use server";

import { insertFile } from "@/services/file-service";
import { Binary, ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function uploadFileAction(uploadedFile: File): Promise<string> {
  const arrayBuffer = await uploadedFile.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { name, size, type, lastModified } = uploadedFile;
  const { insertedId }: { insertedId: ObjectId } = await insertFile({
    name,
    size,
    type,
    lastModifiedAt: new Date(lastModified),
    uploadedAt: new Date(),
    data: new Binary(buffer),
  });

  revalidateTag('files')

  return insertedId.toString();
}
