import { Binary, Document } from "mongodb";

export type ProtocolFileCategory = 'negotiations' | 'mediations'
export type ProtocolFileType = 'meetings' | 'discrepancy'

type ProtocolFiles = Record<ProtocolFileType, string[]>

interface ProtocolData {
  branch: string; // branza
  disputeReason: string; // powod sporu moze byc kilka :  czas pracy, standardy bhp, wysokoć płac, normy pracy, inne
  tradeUnionName: string; // nazwa związku
  workplaceName: string; // nazwa zakładu
  files: Record<ProtocolFileCategory, ProtocolFiles>
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
