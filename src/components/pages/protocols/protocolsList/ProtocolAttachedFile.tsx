"use client";

import { FileSerialized } from "@/types/file";
import { Button } from "@/components/shared";

const ProtocolDetailsAttachedFile = (file: FileSerialized) => {
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
    <div className="flex items-center gap-2">
      <span>{file?.name || "-"}</span>
      {file?.data && (
        <Button
          onClickAction={() => handleDownload(file)}
          className="w-20"
          message="Pobierz"
        />
      )}
    </div>
  );
};

export default ProtocolDetailsAttachedFile;
