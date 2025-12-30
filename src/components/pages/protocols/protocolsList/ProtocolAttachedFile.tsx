"use client";

import { FileSerialized } from "@/types/file";
import { Button } from "@/components/shared";
import Image from "next/image";
import IconPDF from "@/icons/iconPDF/IconPDF";
import { downloadFile } from "@/lib/utils";

const ProtocolDetailsAttachedFile = (file: FileSerialized) => {
  const getFileBlob = (file: FileSerialized): Blob | undefined => {
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

  const handleDownload = (file: FileSerialized) => {
    const blob = getFileBlob(file);
    if (!blob) return;
    downloadFile(blob, file.name || "downloaded_file");
  };

  return (
    <div className="flex items-center gap-2">
      <span>{file?.name || "-"}</span>
      {file?.data && (
        <div className="contents">
          {file.type === "application/pdf" ? (
            <IconPDF style="size-[50px] bg-red-500" />
          ) : (
            <Image
              src={URL.createObjectURL(getFileBlob(file)!)}
              alt={file.name}
              width={50}
              height={50}
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
              loading="lazy"
            />
          )}
          <Button
            onClickAction={() => handleDownload(file)}
            className="!w-20"
            message="Pobierz"
          />
        </div>
      )}
    </div>
  );
};

export default ProtocolDetailsAttachedFile;
