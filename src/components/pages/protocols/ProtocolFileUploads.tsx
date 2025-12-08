"use client"

import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { Protocol, ProtocolFileCategory } from "@/types/protocol";
import { mapDisputeReason, mapFileCategory } from "./utils";
import UploadFileForm from "@/components/shared/UploadFileForm";
import { File, FileSerialized } from "@/types/file";
import { useState } from "react";
import { Button } from "@/components/shared";

type Props = {
  id: string
  files: Partial<FileSerialized>[]
  fileIds: Record<ProtocolFileCategory, string[]>
  addFile: (protocolId: string, category: ProtocolFileCategory, fileId: string) => Promise<void>
}

const fileCategories: ProtocolFileCategory[] = [
  "demands", "mediationMeetings", "mediationDiscrepancy", "negotiationMeetings", "negotiationDiscrepancy", 'agreement', "other"
]

const ProtocolFileUploads = ({ id, files, fileIds, addFile }: Props) => {
  const [visibleCategory, setVisibleCategory] = useState<ProtocolFileCategory>('demands')
  const onProtocolFileUploaded = async (fileId: string, category: ProtocolFileCategory) => {
    await addFile(id, category, fileId)
  }

  const getFileById = (fileId: string) => files.find((file) => file._id == fileId) 

  return (
    <div className="pt-16">
      <div className="flex flex-wrap gap-x-8 gap-y-2 pb-8">
        {fileCategories.map((category, i) =>(
          <Button
            key={i}
            className="!w-auto"
            message={mapFileCategory[category]}
            onClickAction={() => setVisibleCategory(category)}
          />
        ))}
      </div>
      {fileCategories.map((category, i) => (
        <div key={i} className={category != visibleCategory ? '!hidden' : ''}>
          <div className="font-black">{mapFileCategory[category]}</div>
          <div>liczba załączników: {fileIds[category]?.length || 0}</div>
          {fileIds[category]?.map((fileId) => (
            <div key={fileId}>{getFileById(fileId)?.name}</div>
          ))}
          <UploadFileForm category={category} onFileUpload={onProtocolFileUploaded} />
        </div>
      ))}
    </div>
  );
};

export default ProtocolFileUploads;
