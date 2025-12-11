"use client";

import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import {
  ProtocolFileCategory,
  ProtocolWithFilesSerialized,
} from "@/types/protocol";
import { mapFileCategory } from "../utils";

// TODO: map files
const ProtocolListItemDetails = ({
  files,
  lastModifiedAt,
  uploadedAt,
}: ProtocolWithFilesSerialized) => {
  return (
    <div className="col-span-5 p-4 mb-4 border border-black bg-slate-200">
      <div className="flex gap-8">
        <div>Utworzono: {formatDateAndTime(uploadedAt)}</div>
        <div>Modyfikowano: {formatDateAndTime(lastModifiedAt)}</div>
      </div>
      <div>
        <div className="text-lg font-black pb-2">Pliki</div>
        {Object.entries(mapFileCategory).map(([key, value]) => (
          <div key={key} className="mb-2">
            <div className="font-black">{value}</div>
            {files[key as ProtocolFileCategory].map((file, i) => (
              <div key={i}>{file?.name || "-"}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProtocolListItemDetails;
