"use client";

import { Button, Icon } from "@/components/shared";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isEditorOpen: boolean;
  setIsEditorOpen: Dispatch<SetStateAction<boolean>>;
};

function CloseFormBtn({ isEditorOpen, setIsEditorOpen }: Props) {
  return (
    <div className="mb-16">
      <Button
        type="button"
        variant="empty-accent"
        className="w-full"
        onClickAction={() => setIsEditorOpen(true)}
      >
        <div className="flex items-center gap-2">
          {
            <Icon
              icon="lock"
              size={16}
              className="bg-accent group-hover:bg-white"
            />
          }
          <p>
            {" "}
            {!isEditorOpen ? "Zamknij publikację" : "Zamykanie formularza"}
          </p>
        </div>{" "}
      </Button>
      <p className="mt-2 text-sm text-font-light">
        {!isEditorOpen
          ? "Formularz przestanie działać. Wyniki zostaną."
          : "Dokończ w panelu zamykania."}
      </p>
    </div>
  );
}

export default CloseFormBtn;
