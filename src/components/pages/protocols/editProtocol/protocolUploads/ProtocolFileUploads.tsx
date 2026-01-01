"use client";

import { ProtocolFileCategory } from "@/types/protocol";
import { useState } from "react";
import ProtocolUploadsMenu from "./ProtocolUploadsMenu";
import ProtocolUploadsPanel from "./ProtocolUploadsPanel";

const ProtocolFileUploads = () => {
  const [visibleCategory, setVisibleCategory] =
    useState<ProtocolFileCategory>("demands");

  return (
    <div className="pt-16">
      <div className="text-xl py-md">Krok 2: dodaj dokumenty</div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 pb-8">
        <ProtocolUploadsMenu
          visibleCategory={visibleCategory}
          setVisibleCategory={setVisibleCategory}
        />
      </div>

      <ProtocolUploadsPanel visibleCategory={visibleCategory} />
    </div>
  );
};

export default ProtocolFileUploads;
