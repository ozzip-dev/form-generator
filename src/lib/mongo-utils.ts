import { Db, Document } from "mongodb"

const getModelValidator = (
  properties: unknown, 
  required: string[] = [], 
  bsonType: string = 'object'
): Document => ({
  validator: {
    $jsonSchema: {
      bsonType,
      required,
      properties
    }
  }
})

// TODO Pawel: allow for other options?
export const makeDbCollection = (
  db: Db, 
  name: string, 
  properties: unknown, 
  required: string[] = [], 
  bsonType: string = 'object'
) => {
  const validator: Document = getModelValidator(
    properties, required, bsonType
  )
  db.createCollection(name, { validator })
}