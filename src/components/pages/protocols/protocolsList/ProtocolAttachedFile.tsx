"use client";

import { FileSerialized } from "@/types/file";
import { Button } from "@/components/shared";
import Image from "next/image";
import { downloadFile } from "@/lib/utils";
import Icon from "@/components/shared/icons/Icon";

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
    <div className="flex items-center gap-10">
      <span className="truncate w-4/6">{file?.name || "-"}</span>
      {file?.data && (
        <div className="contents">
          {file.type === "application/pdf" ? (
            <Icon icon="file-pdf-regular-full" size={40} color="red" />
          ) : (
            <Image
              src={URL.createObjectURL(getFileBlob(file)!)}
              alt={file.name}
              width={30}
              height={30}
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
              loading="lazy"
            />
          )}
          <div className="hidden sm:block">
            <Button
              onClickAction={() => handleDownload(file)}
              message="Pobierz"
              variant="primary-rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProtocolDetailsAttachedFile;
