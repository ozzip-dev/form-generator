"use client";

import { Button } from "@/components/shared";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isEditorOpen: boolean;
  setIsEditorOpen: Dispatch<SetStateAction<boolean>>;
};

function CloseFormBtn({ isEditorOpen, setIsEditorOpen }: Props) {
  return (
    <div className="mb-8">
      <Button
        type="button"
        variant="empty-accent"
        className="w-full"
        onClickAction={() => setIsEditorOpen(true)}
      >
        {" "}
        {!isEditorOpen ? "Zamknij publikację" : "Zamykanie formularza"}
      </Button>
      <p className="text-sm text-font-light">
        {!isEditorOpen
          ? "Formularz przestanie działać. Wyniki zostaną."
          : "Dokończ w panelu zamykania."}
      </p>
    </div>
  );
}

export default CloseFormBtn;
