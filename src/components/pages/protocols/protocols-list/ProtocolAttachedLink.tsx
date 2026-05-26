"use client";

import Link from "next/link";
import { parseUrl } from "@/helpers/protocolHelpers";
import Icon from "@/components/shared/icons/Icon";

type Props = {
  link: string;
};

const ProtocolAttachedLink = ({ link }: Props) => {
  const parsedUrl = parseUrl(link);

  return (
    <div className="flex items-center">
      <div className="grid min-w-0 grid-cols-[20px_auto] items-center gap-4">
        <button
          type="button"
          onClick={() => {
            window.open(parsedUrl, "_blank", "noopener,noreferrer");
          }}
          aria-label="Otwórz w nowym oknie"
          className="flex shrink-0 items-center justify-center transition hover:opacity-70"
        >
          <Icon icon="open-in-new-window" size={20} className="bg-accent" />
        </button>

        <Link
          href={parsedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate hover:underline"
        >
          {link}
        </Link>
      </div>
    </div>
  );
};

export default ProtocolAttachedLink;
