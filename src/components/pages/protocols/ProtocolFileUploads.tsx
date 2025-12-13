"use client";

import { ProtocolFileCategory } from "@/types/protocol";
import { mapFileCategory } from "./utils";
import UploadFileForm from "@/components/shared/UploadFileForm";
import { FileSerialized } from "@/types/file";
import { useState } from "react";
import { Button } from "@/components/shared";
import ProtocolAttachedFile from "./ProtocolAttachedFile";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { addProtocolFileAction } from "@/actions/protocol/addProtocolFileAction";

type Props = {
  files: Partial<FileSerialized>[];
  fileIds: Record<ProtocolFileCategory, string[]>;
};

const fileCategories: ProtocolFileCategory[] = [
  "demands",
  "mediationMeetings",
  "mediationDiscrepancy",
  "negotiationMeetings",
  "negotiationDiscrepancy",
  "agreement",
  "other",
];

const ProtocolFileUploads = ({ files, fileIds }: Props) => {
  const [visibleCategory, setVisibleCategory] =
    useState<ProtocolFileCategory>("demands");
  const protocolId = useSafeURLParam("protocolId");
  if (!protocolId) return;

  const onProtocolFileUploaded = async (
    fileId: string,
    category: ProtocolFileCategory
  ) => {
    await addProtocolFileAction({ protocolId, fileId, fileCategory: category });
  };

  const getFileById = (fileId: string) =>
    files.find((file) => file._id == fileId);

  return (
    <div className="pt-16">
      <div className="text-[30px] font-black">Krok 2: dodaj dokumenty</div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 pb-8">
        {fileCategories.map((category, idx) => (
          <Button
            key={idx}
            className={`!w-auto ${
              category == visibleCategory ? "!bg-slate-300 !text-black" : ""
            }`}
            message={mapFileCategory[category]}
            onClickAction={() => setVisibleCategory(category)}
          />
        ))}
      </div>
      {fileCategories.map((category, idx) => (
        <div key={idx} className={category != visibleCategory ? "!hidden" : ""}>
          <div className="font-black">{mapFileCategory[category]}</div>
          <div>liczba załączników: {fileIds[category]?.length || 0}</div>
          {fileIds[category]?.map((fileId) => (
            <ProtocolAttachedFile
              key={fileId}
              file={getFileById(fileId)!}
              protocolId={protocolId}
              fileCategory={category}
            />
          ))}
          <UploadFileForm
            category={category}
            onFileUpload={onProtocolFileUploaded}
          />
        </div>
      ))}
    </div>
  );
};

export default ProtocolFileUploads;
