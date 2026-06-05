"use client";

import { useModal } from "@/context/ModalContextProvider";
import { FileSerialized } from "@/types/file";
import Image from "next/image";
import { downloadFile } from "@/lib/utils";
import { Icon } from "@/components/shared";
import { getFileBlob, isImageType, isPdfType } from "@/helpers/fileHelpers";
import { openProtocolImagePreviewModal } from "../protocol-image-preview";

const ProtocolDetailsAttachedFile = (file: FileSerialized) => {
  const { openModal } = useModal();

  const handleDownload = (file: FileSerialized) => {
    const blob = getFileBlob(file);
    if (!blob) return;
    downloadFile(blob, file.name || "downloaded_file");
  };

  const handleFileNameClick = () => {
    if (isImageType(file.type)) {
      openProtocolImagePreviewModal(openModal, file);
      return;
    }

    handleDownload(file);
  };

  const displayIcon = isImageType(file.type) || isPdfType(file.type);

  return (
    <div className="flex items-center">
      {file?.data && (
        <>
          <div className="grid min-w-0 grid-cols-[20px_repeat(2,auto)] items-center gap-4">
            <button
              type="button"
              onClick={() => handleDownload(file)}
              aria-label="Pobierz plik"
              className="flex shrink-0 items-center justify-center transition hover:opacity-70"
            >
              <Icon icon="download" size={20} className="bg-accent" />
            </button>

            {isImageType(file.type) ? (
              <button
                type="button"
                onClick={handleFileNameClick}
                className="truncate text-left underline decoration-accent underline-offset-2 hover:text-accent_dark"
              >
                {file?.name || "-"}
              </button>
            ) : (
              <div className="truncate">{file?.name || "-"}</div>
            )}

            {displayIcon &&
              (file.type === "application/pdf" ? (
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
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProtocolDetailsAttachedFile;
