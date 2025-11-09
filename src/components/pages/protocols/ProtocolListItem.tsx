"use client";

import { Binary } from "mongodb";
import { mapFileExtensionName } from "./utils";
import { ProtocolSerialized } from "@/types/protocol";
import { convertBToKB } from "@/lib/utils";
import { formatDateAndHour } from "@/helpers/dates/formatDateAndHour";
import { ButtonClick } from "@/components/shared";

const getFileBlob = (data: Binary, type: string): Blob => {
  const binaryString = atob(data as unknown as string);
  const len = binaryString.length;
  const uint8Array: Uint8Array = new Uint8Array(len);
  for (let i = 0; i < len; i++) uint8Array[i] = binaryString.charCodeAt(i);
  const blob = new Blob([uint8Array as BlobPart], { type });
  return blob;
};

const saveFile = (data: Binary, type: string, name: string) => {
  const blob = getFileBlob(data, type);

  const a = document.createElement("a");
  a.download = name;
  a.href = URL.createObjectURL(blob);
  a.addEventListener("click", () => {
    setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
  });
  a.click();
};

const ProtocolListItem = ({
  data, name, type, size, uploadedAt
} : ProtocolSerialized) => {
  return (
    <div
      className="
        grid grid-cols-[18rem_5rem_6rem_12rem_6rem]
        items-center gap-2
        mb-1
      "
    >
      <div>{name}</div>
      <div>{mapFileExtensionName(type)}</div>
      <div>{convertBToKB(size)} KB</div>
      <div>{formatDateAndHour(uploadedAt)}</div>
      <div>
        <ButtonClick
          message="Pobierz"
          onClickAction={() => saveFile(data, type, name)}
        />
      </div>
    </div>
  );
};

export default ProtocolListItem;
