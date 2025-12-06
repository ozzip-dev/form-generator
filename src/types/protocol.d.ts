import { Binary, Document } from "mongodb";

// branza
// data rozpoczecia sporu
// powod sporu moze byc kilka :  czas pracy, standardy bhp, wysokoć płac, normy pracy, inne
// nazwa związku
// nazwa zakładu
// rokowania - ladowanie plików: protokoły ze spotkań, ladowanie plików: główny protokul rozbierzności
// mediacje - ladowanie plików: protokoły ze spotkań, ladowanie plików: główny protokul rozbierzności

export type ProtocolFileCategory = 'negotiations' | 'mediations'
export type ProtocolFileType = 'meetings' | 'discrepancy'
export type ProtocolDisputeReason = 'workTime' | 'safety' | 'wages' | 'standards' | 'other'

type ProtocolFiles = Record<ProtocolFileType, string[]>

interface ProtocolData {
  branch: string; // branza
  disputeReason: ProtocolDisputeReason[]; // powod sporu moze byc kilka :  czas pracy, standardy bhp, wysokoć płac, normy pracy, inne
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

export type ProtocolInsertData = {
  branch: string
  disputeReason: ProtocolDisputeReason[]
  tradeUnionName: string
  workplaceName: string
  disputeStartDate: string
  negotiations?: ProtocolFiles
  mediations?: ProtocolFiles
}

export type ProtocolMenuItem = { text: string; link: string }