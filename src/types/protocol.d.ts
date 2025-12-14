import { Binary, Document } from "mongodb";
import { File, FileSerialized } from "./file";

// branza
// data rozpoczecia sporu
// powod sporu moze byc kilka :  czas pracy, standardy bhp, wysokoć płac, normy pracy, inne
// nazwa związku
// nazwa zakładu
// rokowania - ladowanie plików: protokoły ze spotkań, ladowanie plików: główny protokul rozbierzności
// mediacje - ladowanie plików: protokoły ze spotkań, ladowanie plików: główny protokul rozbierzności

// Jeśli chcemy zagniezdzoną strukture
// export type ProtocolFileCategory = 'demands' | 'negotiations' | 'mediations' | 'agreement' | 'other'
// export type ProtocolFileType = 'meetings' | 'discrepancy'
// type ProtocolFiles = Record<ProtocolFileType, string[]> | string[]

// TODO: czy dac strukture zagniezdzona?
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
  fileIds: Record<ProtocolFileCategory, string[]>; // file ids
  // files: Record<ProtocolFileCategory, ProtocolFiles>
  // files: { // file ids
  //   demands: string[];
  //   negotiations: ProtocolFiles;
  //   mediations: ProtocolFiles;
  //   agreement: string[];
  //   other: string[];
  // }
  // negotiations: ProtocolFiles; // rokowania
  // mediations: ProtocolFiles; // mediacje
}

export interface Protocol extends ProtocolData {
  _id: ObjectId;
  disputeStartDate: Date; // data rozpoczecia sporu
  lastModifiedAt: Date;
  uploadedAt: Date;
}

export interface ProtocolSerialized extends ProtocolData {
  _id: string;
  disputeStartDate: string; // data rozpoczecia sporu
  lastModifiedAt: string;
  uploadedAt: string;
}

export type ProtocolInsertData = {
  branch: string;
  disputeReason: string[];
  tradeUnionName: string;
  workplaceName: string;
  disputeStartDate: string;
  // negotiations?: ProtocolFiles
  // mediations?: ProtocolFiles
};

export type ProtocolWithFilesSerialized = ProtocolSerialized & {
  files: Record<ProtocolFileCategory, (FileSerialized | null)[]>;
};

export type ProtocolMenuItem = { text: string; link: string };
