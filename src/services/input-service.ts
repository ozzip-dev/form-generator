import { find } from "@/lib/mongo";
import { Input } from "@/types/input";
import { Db } from "mongodb";

export async function getTemplateInputs(database: Db) {
  const templateInputs = await find(database, 'input', { template: true })
  return templateInputs as Input[]
}