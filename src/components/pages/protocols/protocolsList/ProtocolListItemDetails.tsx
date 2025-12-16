"use client";

import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import {
  ProtocolFileCategory,
  ProtocolWithFilesSerialized,
} from "@/types/protocol";
import { mapFileCategory } from "../utils";
import ProtocolAttachedFileCategory from "./ProtocolAttachedFileCategory";

const ProtocolListItemDetails = ({
  files,
  lastModifiedAt,
  uploadedAt,
}: ProtocolWithFilesSerialized) => {
  console.log("mapFileCategory", mapFileCategory);
  console.log("mapFileCategory", Object.values(mapFileCategory));
  const ttt = Object.entries(mapFileCategory).filter(([_, val]) => {});

  console.log("object", Object.entries(mapFileCategory));

  return (
    <div className="col-span-5 p-4 mb-4 border border-black bg-slate-200">
      <div className="flex gap-8">
        <div>Utworzono: {formatDateAndTime(uploadedAt)}</div>
        <div>Modyfikowano: {formatDateAndTime(lastModifiedAt)}</div>
      </div>
      <div>
        <div className="text-lg font-black pb-2">Pliki</div>
        {Object.entries(mapFileCategory).map(([key, value]) => (
          <ProtocolAttachedFileCategory
            key={key}
            files={files}
            category={key as ProtocolFileCategory}
            header={value}
          />
        ))}
      </div>
    </div>
  );
};

export default ProtocolListItemDetails;
