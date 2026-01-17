import { Binary, Document } from "mongodb";
import { File, FileSerialized } from "./file";

export type ProtocolFileCategory =
  | "demands"
  | "negotiationMeetings"
  | "negotiationDiscrepancy"
  | "mediationMeetings"
  | "mediationDiscrepancy"
  | "agreement"
  | "other";

interface ProtocolData {
  branch: string; // branza
  disputeReason: Record<string, string>; // powod sporu moze byc kilka :  czas pracy, standardy bhp, wysokoć płac, normy pracy, inne
  tradeUnionName: string; // nazwa związku
  workplaceName: string; // nazwa zakładu
  fileIds: Record<ProtocolFileCategory, string[]>;
}

export interface Protocol extends ProtocolData {
  _id: ObjectId;
  disputeStartDate: Date; // data rozpoczecia sporu
  lastModifiedAt: Date;
  uploadedAt: Date;
  uploadedBy: ObjectId;
}

export interface ProtocolSerialized extends ProtocolData {
  _id: string;
  disputeStartDate: string; // data rozpoczecia sporu
  lastModifiedAt: string;
  uploadedAt: string;
  uploadedBy: string;
}

export type ProtocolInsertData = {
  branch: string;
  disputeReason: Record<string, string>;
  tradeUnionName: string;
  workplaceName: string;
  disputeStartDate: string;
};

export type ProtocolWithFilesSerialized = ProtocolSerialized & {
  files: Record<ProtocolFileCategory, (FileSerialized | null)[]>;
};
