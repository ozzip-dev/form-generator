"use client";

import { ProtocolFileCategory } from "@/types/protocol";
import { FileSerialized } from "@/types/file";
import ProtocolDetailsAttachedFile from "./ProtocolAttachedFile";

type Props = {
  files: Record<ProtocolFileCategory, (FileSerialized | null)[]>;
  category: ProtocolFileCategory;
  header: string;
};

const ProtocolAttachedFileCategory = ({ files, category, header }: Props) => {
  return (
    <div className="mb-2">
      <div className="font-black">{header}</div>
      {files[category as ProtocolFileCategory].map((file, i) =>
        file ? (
          <ProtocolDetailsAttachedFile key={i} {...file} />
        ) : (
          <div key={i}>Bledny plik</div>
        )
      )}
    </div>
  );
};

export default ProtocolAttachedFileCategory;
