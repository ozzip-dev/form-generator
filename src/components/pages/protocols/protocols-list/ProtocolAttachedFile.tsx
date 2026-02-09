"use client";

import { FileSerialized } from "@/types/file";
import { Button } from "@/components/shared";
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
          <div className="flex items-center gap-2 w-[26rem] sm:w-[35rem] md:w-[48rem] lg:w-[65rem]">
            <div className="truncate mr-4">{file?.name || "-"}</div>

            {file.type === "application/pdf" ? (
              <Icon icon="file-pdf-regular-full" size={30} color="red" />
            ) : (
              <Image
                src={URL.createObjectURL(getFileBlob(file)!)}
                alt={file.name}
                width={30}
                height={30}
              />
            )}
          </div>

          <Button
            onClickAction={() => handleDownload(file)}
            message="Pobierz"
            variant="primary-rounded"
            className="hidden sm:block ml-auto"
          />
        </>
      )}
    </div>
  );
};

export default ProtocolDetailsAttachedFile;
