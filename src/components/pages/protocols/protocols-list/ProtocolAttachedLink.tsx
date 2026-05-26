"use client";

import Link from "next/link";
import { Button } from "@/components/shared";
import { parseUrl } from "@/helpers/protocolHelpers";

type Props = {
  link: string;
};

const ProtocolAttachedLink = ({ link }: Props) => {
  const parsedUrl = parseUrl(link);

  return (
    <div className="flex items-center">
      <div>
        <Link
          href={parsedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4 block truncate hover:underline"
        >
          {link}
        </Link>
      </div>

      <Button
        onClickAction={() => {
          window.open(parsedUrl, "_blank", "noopener,noreferrer");
        }}
        message="Otwórz"
        variant="primary-rounded"
        className="ml-auto hidden sm:block"
      />
    </div>
  );
};

export default ProtocolAttachedLink;
