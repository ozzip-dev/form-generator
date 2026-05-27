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
  links,
}: ProtocolWithFilesSerialized) => {
  return (
    <Card>
      <div className="hidden gap-12 pb-sm text-sm text-font_dark sm:flex">
        <div>Edytowano: {formatDateAndTime(lastModifiedAt)}</div>
        <div>Utworzono: {formatDateAndTime(uploadedAt)}</div>
      </div>

      {Object.entries(mapFileCategory).map(([key, value]) => (
        <ProtocolAttachedFileCategory
          key={key}
          files={files}
          links={links}
          category={key as ProtocolAttachmentCategory}
          header={value}
        />
      ))}
    </Card>
  );
};

export default ProtocolListItemDetails;
