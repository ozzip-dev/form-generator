"use client";

import { FileSerialized } from "@/types/file";
import Image from "next/image";
import { downloadFile } from "@/lib/utils";
import Icon from "@/components/shared/icons/Icon";
import { getFileBlob } from "@/helpers/fileHelpers";

const ProtocolDetailsAttachedFile = (file: FileSerialized) => {
  const handleDownload = (file: FileSerialized) => {
    const blob = getFileBlob(file);
    if (!blob) return;
    downloadFile(blob, file.name || "downloaded_file");
  };

  return (
    <div className="flex items-center">
      {file?.data && (
        <>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => handleDownload(file)}
              aria-label="Pobierz plik"
              className="flex shrink-0 items-center justify-center transition hover:opacity-70"
            >
              <Icon icon="download" size={20} className="bg-accent" />
            </button>

            <div className="truncate">{file?.name || "-"}</div>

            {file.type === "application/pdf" ? (
              <Icon
                icon="file-pdf-regular-full"
                size={30}
                className="bg-error"
              />
            ) : (
              <Image
                src={URL.createObjectURL(getFileBlob(file)!)}
                alt={file.name}
                width={30}
                height={30}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProtocolDetailsAttachedFile;
