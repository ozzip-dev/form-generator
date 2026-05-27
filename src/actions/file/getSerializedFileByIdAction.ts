"use server";

import { serializeFile } from "@/lib/serialize-utils";
import { getFileById } from "@/services/file-service";
import { FileSerialized } from "@/types/file";

type FilePayload = Pick<FileSerialized, "_id" | "name" | "type" | "data">;

export async function getSerializedFileByIdAction(
  fileId: string,
): Promise<FilePayload | null> {
  try {
    const file = await getFileById(fileId);
    const { _id, name, type, data } = serializeFile(file);

    return {
      _id,
      name,
      type,
      data,
    };
  } catch (error) {
    console.error("Failed to fetch file by id", { fileId, error });
    return null;
  }
}
