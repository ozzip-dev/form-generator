"use client";

import { FileSerialized } from "@/types/file";
import { ProtocolFileCategory } from "@/types/protocol";
import { useState } from "react";
import ProtocolUploadsMenu from "./ProtocolUploadsMenu";
import ProtocolUploadsPanel from "./ProtocolUploadsPanel";

type Props = {
  files: Partial<FileSerialized>[];
};

const ProtocolFileUploads = ({ files }: Props) => {
  const [visibleCategory, setVisibleCategory] =
    useState<ProtocolFileCategory>("demands");

  return (
    <div className="pt-16">
      <div className="text-[30px] font-black">Krok 2: dodaj dokumenty</div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 pb-8">
        <ProtocolUploadsMenu
          visibleCategory={visibleCategory}
          setVisibleCategory={setVisibleCategory}
        />
      </div>

      <ProtocolUploadsPanel visibleCategory={visibleCategory} files={files} />
    </div>
  );
};

export default ProtocolFileUploads;
