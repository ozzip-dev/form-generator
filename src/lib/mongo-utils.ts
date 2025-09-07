import { DbModel, Properties } from "@/types/mongo"
import { Db, Document } from "mongodb"

const getModelValidator = (
  properties: Properties, 
  required: string[],
): Document => ({
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required,
      properties
    }
  }
})

// TODO Pawel: allow for other options?
export const makeDbCollection = (db: Db, model: DbModel) => {
  const { name, properties, required } = model
  const validator: Document = getModelValidator(
    properties, required
  )
  db.createCollection(name, { validator })
}