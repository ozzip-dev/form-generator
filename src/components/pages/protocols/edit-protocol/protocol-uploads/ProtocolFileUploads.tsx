"use client";

import { ProtocolAttachmentCategory } from "@/types/protocol";
import { useState } from "react";
import ProtocolUploadsMenu from "./ProtocolUploadsMenu";
import ProtocolUploadsPanel from "./ProtocolUploadsPanel";
import { MAX_FILE_SIZE_MB } from "@/helpers/protocolHelpers";

const ProtocolFileUploads = () => {
  const [visibleCategory, setVisibleCategory] =
    useState<ProtocolAttachmentCategory>("demands");

  return (
    <div className="container pt-16">
      <h2 className="py-md text-xl">Krok 2: dodaj dokumenty</h2>
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
