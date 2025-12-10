"use client";

import { Binary } from "mongodb";
import { mapFileExtensionName } from "../utils";
import { ProtocolSerialized } from "@/types/protocol";
import { convertBToKB } from "@/lib/utils";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import Link from "next/link";

// TODO: use this code for files

// const getFileBlob = (data: Binary, type: string): Blob => {
//   const binaryString = atob(data as unknown as string);
//   const len = binaryString.length;
//   const uint8Array: Uint8Array = new Uint8Array(len);
//   for (let i = 0; i < len; i++) uint8Array[i] = binaryString.charCodeAt(i);
//   const blob = new Blob([uint8Array as BlobPart], { type });
//   return blob;
// };

// const saveFile = (data: Binary, type: string, name: string) => {
//   const blob = getFileBlob(data, type);

//   const a = document.createElement("a");
//   a.download = name;
//   a.href = URL.createObjectURL(blob);
//   a.addEventListener("click", () => {
//     setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
//   });
//   a.click();
// };

const ProtocolListItem = ({
  _id,
  branch,
  tradeUnionName,
  workplaceName,
  disputeStartDate,
}: ProtocolSerialized) => {
  return (
    <div className="contents">
      <div>{branch}</div>
      <div>{tradeUnionName}</div>
      <div>{workplaceName}</div>
      <div>{formatDateAndTime(disputeStartDate)}</div>
      <Link href={`/protocols/${_id}`}>
        <b>Edytuj</b>
      </Link>
    </div>
  );
};

export default ProtocolListItem;
