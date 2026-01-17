export type FileCategory = "protocol" | "post" /* ? */ | "avatar"; /* ? */

interface FileData extends Document {
  name: string;
  // "jpg" | "png" | "doc" | "docx" | "odt" | "pdf" | "txt" | "rtf";
  type: string;
  category: FileCategory;
  size: number; // max 1mb?
  uploadedBy?: string;
}

export interface File extends FileData {
  _id: ObjectId;
  data: Binary;
  lastModifiedAt: Date;
  uploadedAt: Date;
}

export interface FileSerialized extends FileData {
  _id: string;
  data: string;
  lastModifiedAt: string;
  uploadedAt: string;
}
