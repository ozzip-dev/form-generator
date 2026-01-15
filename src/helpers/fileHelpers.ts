import { FileSerialized } from "@/types/file";

export const getFileBlob = (file: FileSerialized): Blob | undefined => {
  if (!file.data) return;
  const byteCharacters = atob(file.data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray]);
  return blob;
};
