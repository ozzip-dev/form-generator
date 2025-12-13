// import { ProtocolFileCategory } from "@/types/protocol";

// export type ProtocolFilters = {
//   type: string;
//   name: string;
// };

// export const filtersDefault = { type: "", name: "" };

// // TODO: move utils to file utils
// export const fileExtensionMap: Record<string, string> = {
//   "text/rtf": "rtf",
//   "application/vnd.oasis.opendocument.text": "odt",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
//     "docx",
//   "application/pdf": "pdf",
//   "image/png": "png",
//   "image/jpeg": "jpg",
// };

// export const mapFileExtensionName = (type: string): string => {
//   return fileExtensionMap[type];
// };

// export const mapDisputeReason: Record<string, string> = {
//   workTime: "Czas pracy",
//   workStandards: "Standardy BHP",
//   wages: "Wysokoć płac",
//   safetyConditions: "Normy pracy",
// };

// export const mapFileCategory: Record<ProtocolFileCategory, string> = {
//   demands: "Żądania wszczynające spór",
//   mediationMeetings: "Mediacje: spotkania",
//   mediationDiscrepancy: "Mediacje: rozbieności",
//   negotiationMeetings: "Rokowania: spotkania",
//   negotiationDiscrepancy: "Rokowania: rozbieności",
//   agreement: "Porozumienie kończące spór",
//   other: "Inne",
// };

import { ProtocolFileCategory } from "@/types/protocol";

export enum SortOrder {
  Ascending = "ascending",
  Descending = "descending",
}

export const mapSortOrder: Record<SortOrder, string> = {
  ascending: "Od najstarszych",
  descending: "Od najnowszych",
};

export const isAscending = (order: SortOrder) => order == SortOrder.Ascending;

export type ProtocolFilters = {
  text: string;
  fromDate: string;
  toDate: string;
  sortOrder: SortOrder;
  // disputeReasons : string[] - checkbox group
};

export const filtersDefault: ProtocolFilters = {
  text: "",
  fromDate: "",
  toDate: "",
  sortOrder: SortOrder.Ascending,
  // disputeReasons = ''
};

// TODO: move utils to file utils
export const fileExtensionMap: Record<string, string> = {
  "text/rtf": "rtf",
  "application/vnd.oasis.opendocument.text": "odt",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/pdf": "pdf",
  "image/png": "png",
  "image/jpeg": "jpg",
};

export const mapFileExtensionName = (type: string): string => {
  return fileExtensionMap[type];
};

export const mapDisputeReason: Record<string, string> = {
  workTime: "Czas pracy",
  safety: "Standardy BHP",
  wages: "Wysokoć płac",
  standards: "Normy pracy",
  other: "Inne",
};

export const mapFileCategory: Record<ProtocolFileCategory, string> = {
  demands: "Żądania wszczynające spór",
  mediationMeetings: "Mediacje: spotkania",
  mediationDiscrepancy: "Mediacje: rozbieności",
  negotiationMeetings: "Rokowania: spotkania",
  negotiationDiscrepancy: "Rokowania: rozbieności",
  agreement: "Porozumienie kończące spór",
  other: "Inne",
};
