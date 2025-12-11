"use client";

import { ProtocolFileCategory } from "@/types/protocol";
import { FileSerialized } from "@/types/file";
import ProtocolDetailsAttachedFile from "./ProtocolAttachedFile";

type Props = {
  files: Record<ProtocolFileCategory, (FileSerialized | null)[]>;
  category: ProtocolFileCategory;
  header: string;
};

// TODO: poprawic handleDownload(?), testowac dla zepsutych plikow lub blednych ID
const ProtocolAttachedFileCategory = ({ files, category, header }: Props) => {
  const handleDownload = (file: FileSerialized) => {
    if (!file.data) return;
    const byteCharacters = atob(file.data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray]);

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.name || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="mb-2">
      <div className="font-black">{header}</div>
      {files[category as ProtocolFileCategory].map((file, i) =>
        file ? (
          <ProtocolDetailsAttachedFile key={i} {...file} />
        ) : (
          <div key={i}>Bledny plik</div>
        )
      )}
    </div>
  );
};

export default ProtocolAttachedFileCategory;
