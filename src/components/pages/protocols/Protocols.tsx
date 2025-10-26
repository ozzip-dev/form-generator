"use client";

import { Protocol } from "@/types/protocol";
import { Binary } from "mongodb";
import AddProtocolForm from "./AddProtocolForm";

type Props = {
  protocols: Protocol[];
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
    <>
      <div>protokoły</div>
      {protocols.map(({ name, data, type }, i) => (
        <button onClick={() => saveFile(data, type, name)} key={i}>
          Save
        </button>
      ))}
      <div>{protocols?.length}</div>
      <AddProtocolForm />
    </>
  );
};

export default Protocols;
