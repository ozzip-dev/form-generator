"use client";

import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import {
  ProtocolAttachmentCategory,
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
      <div className="text-grey_secondary hidden gap-8 pb-sm text-sm sm:flex">
        <div>Utworzono: {formatDateAndTime(uploadedAt)}</div>
        <div>Edycja: {formatDateAndTime(lastModifiedAt)}</div>
      </div>

      <div className="text-md pb-2 font-semibold">Pliki</div>
      {Object.entries(mapFileCategory).map(([key, value]) => (
        <ProtocolAttachedFileCategory
          key={key}
          files={files}
          category={key as ProtocolAttachmentCategory}
          header={value}
        />
      ))}
    </Card>
  );
};

export default ProtocolListItemDetails;
