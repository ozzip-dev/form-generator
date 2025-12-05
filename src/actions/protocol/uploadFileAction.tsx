"use server";

import { db } from "@/lib/mongo";
import { addProtocol } from "@/services/protocol-service";
import { Binary } from "mongodb";
import { revalidateTag } from "next/cache";

export async function uploadFileAction(file: File): Promise<any> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { name, size, type, lastModified } = file;
  // throw new Error("ppppppppp");
  const resp = await addProtocol(db, {
    createdAt: new Date(),
    name,
    size,
    type,
    lastModifiedAt: new Date(lastModified),
    uploadedAt: new Date(),
    data: new Binary(buffer),
  });

  revalidateTag("protocols");
  return resp;
}
