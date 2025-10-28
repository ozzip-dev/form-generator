export type ProtocolFilters = {
  type: string
  name: string
}

export const filtersDefault = { type: '', name: '' }

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