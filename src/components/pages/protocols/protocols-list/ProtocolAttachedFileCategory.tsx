"use client";

import { ProtocolAttachmentCategory } from "@/types/protocol";
import { FileSerialized } from "@/types/file";
import ProtocolDetailsAttachedFile from "./ProtocolAttachedFile";
import ProtocolAttachedLink from "./ProtocolAttachedLink";

type Props = {
  files: Record<ProtocolAttachmentCategory, (FileSerialized | null)[]>;
  links: Record<ProtocolAttachmentCategory, string[]>;
  category: ProtocolAttachmentCategory;
  header: string;
};

const ProtocolAttachedFileCategory = ({
  files,
  links,
  category,
  header,
}: Props) => {
  const categoryFiles = files[category as ProtocolAttachmentCategory];
  const categoryLinks = links[category as ProtocolAttachmentCategory];

  return (
    <div className="mb-sm flex flex-col gap-4">
      <div className="font-semibold">
        {header} ({[...categoryFiles, ...categoryLinks]?.length || 0})
      </div>

      {categoryFiles.map((file, idx) =>
        file ? (
          <ProtocolDetailsAttachedFile key={idx} {...file} />
        ) : (
          <div key={idx}>Bledny plik</div>
        ),
      )}
      {categoryLinks.map((link, idx) => (
        <ProtocolAttachedLink key={idx} link={link} />
      ))}
    </div>
  );
};

export default ProtocolAttachedFileCategory;
