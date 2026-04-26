import { Button, IconTrash } from "@/components/shared";
import { parseUrl } from "@/helpers/protocolHelpers";
import { ProtocolAttachmentCategory } from "@/types/protocol";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  category: ProtocolAttachmentCategory;
  links: string[];
  onAdd: (
    category: ProtocolAttachmentCategory,
    link: string,
  ) => Promise<boolean>;
  onRemove: (
    category: ProtocolAttachmentCategory,
    link: string,
  ) => Promise<boolean>;
};

const ProtocolLinksForm = ({ category, links, onAdd, onRemove }: Props) => {
  const [draftLink, setDraftLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const trimmedLink = draftLink.trim();
    const wasAdded = await onAdd(category, trimmedLink);

    if (wasAdded) {
      setDraftLink("");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex w-full flex-col gap-4 md:flex-1">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input
          id={`${category}.link.new`}
          type="text"
          value={draftLink}
          onChange={(event) => setDraftLink(event.target.value)}
          placeholder="Wpisz link"
          className="peer w-full rounded-sm border border-default p-2 focus:border-accent focus:outline-none"
        />

        <Button
          type="submit"
          message="Dodaj link"
          variant="primary-rounded"
          className="w-fit shrink-0"
          isLoading={isLoading}
        />
      </form>

      {links.map((value, index) => (
        <div key={`${category}-${index}`} className="flex items-center gap-2">
          <Link href={parseUrl(value)} target="_blank" className="w-auto p-2">
            {value}
          </Link>

          <Button
            type="button"
            icon={<IconTrash size={27} />}
            variant="ghost"
            className="!bg-transparent"
            ariaLabel="Usuń link"
            onClickAction={() => void onRemove(category, value)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProtocolLinksForm;
