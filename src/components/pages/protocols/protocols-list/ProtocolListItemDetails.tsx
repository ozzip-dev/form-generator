"use client";

import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import {
  ProtocolFileCategory,
  ProtocolWithFilesSerialized,
} from "@/types/protocol";
import { mapFileCategory } from "../utils";
import ProtocolAttachedFileCategory from "./ProtocolAttachedFileCategory";
import { Card } from "@/components/shared";

const ProtocolListItemDetails = ({
  files,
  lastModifiedAt,
  uploadedAt,
}: ProtocolWithFilesSerialized) => {
  return (
    <Card>
      <div className="hidden sm:flex gap-8 pb-sm text-grey_secondary text-sm">
        <div>Utworzono: {formatDateAndTime(uploadedAt)}</div>
        <div>Edycja: {formatDateAndTime(lastModifiedAt)}</div>
      </div>

      <div className="text-md font-bold pb-2">Pliki</div>
      {Object.entries(mapFileCategory).map(([key, value]) => (
        <ProtocolAttachedFileCategory
          key={key}
          files={files}
          category={key as ProtocolFileCategory}
          header={value}
        />
      ))}
    </Card>
  );
};

export default ProtocolListItemDetails;
