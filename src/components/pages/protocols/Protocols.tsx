"use client";

import { ProtocolSerialized } from "@/types/protocol";
import { Binary } from "mongodb";
import AddProtocolForm from "./AddProtocolForm";
import ButtonClick from "@/components/ui/buttons/ButtonClick";
import { formatDateAndHour } from "@/helpers/dates/formatDateAndHour";
import { convertBToKB } from "@/lib/utils";

type Props = {
  protocols: ProtocolSerialized[];
};

const mapFileExtensionName = (type: string): string => {
  const extensionMap: Record<string, string> = {
    "text/rtf": "rtf",
    "application/vnd.oasis.opendocument.text": "odt",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
    "application/pdf": "pdf",
    "image/png": "png",
    "image/jpeg": "jpg",
  };

  return extensionMap[type];
};

const getFileBlob = (data: Binary, type: string): Blob => {
  const binaryString = atob(data as unknown as string);
  const len = binaryString.length;
  const uint8Array: Uint8Array = new Uint8Array(len);
  for (let i = 0; i < len; i++) uint8Array[i] = binaryString.charCodeAt(i);
  const blob = new Blob([uint8Array as BlobPart], { type });
  return blob;
};

const Protocols = ({ protocols }: Props) => {
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

  return (
    <div className="p-8">
      {protocols.map(({ name, data, type, size, uploadedAt }, i) => (
        <div
          className="
            grid grid-cols-[18rem_5rem_6rem_12rem_6rem]
            items-center gap-2
            mb-1
          "
          key={i}
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
      ))}

      <AddProtocolForm />
    </div>
  );
};

export default Protocols;
