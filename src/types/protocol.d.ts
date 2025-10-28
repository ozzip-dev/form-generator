import { Binary, Document } from "mongodb";

interface ProtocolData extends Document {
  name: string;
  description?: string;
  // "jpg" | "png" | "doc" | "docx" | "odt" | "pdf" | "txt" | "rtf";
  type: string;
  size: number;
  uploadedBy?: string;
}

export interface Protocol extends ProtocolData {
  _id: ObjectId;
  data: Binary;
  lastModifiedAt: Date;
  uploadedAt: Date;
}

export interface ProtocolSerialized extends ProtocolData {
  _id: string;
  data: any;
  lastModifiedAt: string;
  uploadedAt: string;
}
