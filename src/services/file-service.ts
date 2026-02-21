import {
  db,
  deleteById,
  findAll,
  findById,
  insert,
  insertMany,
} from "@/lib/mongo";
import { serializeFile } from "@/lib/serialize-utils";
import { File, FileSerialized } from "@/types/file";
import {
  DeleteResult,
  InsertManyResult,
  InsertOneResult,
  ObjectId,
} from "mongodb";

export async function insertFile(
  data: Partial<File>,
): Promise<InsertOneResult<File>> {
  return await insert<File>(db, "file", data);
}

export async function insertFiles(
  data: Partial<File>[],
): Promise<InsertManyResult<File>> {
  return await insertMany<File>(db, "file", data);
}

export async function getAllFiles(): Promise<FileSerialized[]> {
  const files = await findAll<File>(db, "file");
  return files.map((file) => serializeFile(file));
}

export async function getFilesByFileIdsNoData(
  fileIdStrings: string[] = [],
): Promise<Partial<FileSerialized>[]> {
  const fileIds = fileIdStrings.map((id) => new ObjectId(id));
  const files = await db
    .collection<File>("file")
    .find({ _id: { $in: fileIds as never[] } })
    .project({ _id: 1, name: 1 })
    .toArray();
  // const files = await find<File>(db, 'file', {{ _id: { $in: fileIds } }, {  }})
  return files.map((file) => ({ ...file, _id: file._id.toString() }));
}

export async function removeFile(fileId: string): Promise<DeleteResult> {
  return await deleteById<File>(db, "file", new ObjectId(fileId));
}

export async function getFileById(fileId: string): Promise<File> {
  const file =
    (await findById<File>(db, "file", fileId)) ||
    (await findById<File>(db, "file", new ObjectId(fileId)));

  if (!file) throw new Error("Invalid file id");
  return file;
}
