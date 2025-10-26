import { Db } from "mongodb";
import { findAll, insert } from "@/lib/mongo";
import { Protocol } from "@/types/protocol";

export async function getProtocols(database: Db): Promise<Protocol[]> {
  const protocols = await findAll(database, "protocol");
  return protocols as Protocol[];
}

export async function addProtocol(
  database: Db,
  data: Partial<Protocol>
): Promise<void> {
  await insert(database, "protocol", data);
}
