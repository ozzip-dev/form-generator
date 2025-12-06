import { db, insert, insertMany } from "@/lib/mongo";
import { File } from "@/types/file";
import { InsertManyResult, InsertOneResult } from "mongodb";

export async function insertFile(
  data: Partial<File>
): Promise<InsertOneResult<File>> {
  return await insert<File>(db, "file", data);
}

export async function insertFiles(
  data: Partial<File>[]
): Promise<InsertManyResult<File>> {
  return await insertMany<File>(db, "file", data);
}
