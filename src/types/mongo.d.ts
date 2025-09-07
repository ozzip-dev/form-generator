type Property = {
  bsonType: BsonType | BsonType[],
  description?: string,
  minimum?: number,
  maximum?: number,
}

export interface Properties {
  [key:string]: Property
}

export type DbModel = {
  name: string, /* model name */
  properties: Properties, /* model field properties */
  required: string[], /* required field keys */
}