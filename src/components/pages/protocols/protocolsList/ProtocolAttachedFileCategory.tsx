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
  const categoryFiles = files[category as ProtocolFileCategory];

  return (
    <div className="mb-sm">
      <div className="font-black">
        {header} ({categoryFiles?.length || 0})
      </div>
      {categoryFiles.map((file, i) =>
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
