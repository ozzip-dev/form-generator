"use client";

import { ProtocolFileCategory } from "@/types/protocol";
import { useState } from "react";
import ProtocolUploadsMenu from "./ProtocolUploadsMenu";
import ProtocolUploadsPanel from "./ProtocolUploadsPanel";

const ProtocolFileUploads = () => {
  const [visibleCategory, setVisibleCategory] =
    useState<ProtocolFileCategory>("demands");

  return (
    <div className="container pt-16">
      <div className="py-md text-xl">Krok 2: dodaj dokumenty</div>
      <div className="pb-md">
        Dołącz pliki w odpowiedniej kategorii. Dopuszczalne formaty to{" "}
        <b>.pdf</b>, <b>.png</b>, <b>.jpg</b>/<b>.jpeg</b> oraz <b>.bmp</b>.
        Maksymalny rozmiar jednego pliku to <b>1MB</b>.
      </div>
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
