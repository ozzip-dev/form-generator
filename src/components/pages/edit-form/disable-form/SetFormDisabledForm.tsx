"use client";

import { useState, useRef } from "react";
import { disableFormAction } from "@/actions/form/disableFormAction";
import { Button } from "@/components/shared";
import TextEditor from "../text-editor/TextEditor";
import { confirmAction } from "@/helpers/confirmAction";

type Props = {
  formId: string;
};

function SetFormDisabledForm({ formId }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const editorContentRef = useRef<string>("");

  const handleCancel = () => {
    setIsFormOpen(false);
    editorContentRef.current = "";
  };

  const handleDisableClick = async () => {
    await confirmAction({
      action: async () => {
        await disableFormAction(formId, editorContentRef.current);
        setIsFormOpen(false);
        editorContentRef.current = "";
      },
      confirmText: "Czy na pewno dezaktywować formularz?",
      yesText: "Wykonaj",
    });
  };

  return (
    <>
      {!isFormOpen ? (
        <Button
          type="button"
          variant="primary-rounded"
          message="Dezaktywacja"
          className="size-fit"
          onClickAction={() => setIsFormOpen(true)}
        />
      ) : (
        <div className="w-full space-y-4 rounded border border-gray-200 bg-white p-4">
          <div className="w-full">
            <h3 className="mb-3 text-sm font-semibold">
              Wpisany tekst będzie się wyświetlał na stronie formularza.
              Wypełnienie go po dezaktywacji będzie niemoliwe. Autor/Autorka
              nadal będzie mieć dostęp do wyników oraz moliwość ich eksportu.
              (opcjonalne)
            </h3>
            <TextEditor
              formId={formId}
              placeholder=""
              onContentUpdate={(content) => {
                editorContentRef.current = content;
              }}
              displaySaveButton={false}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="primary-rounded"
              message="Anuluj"
              className="h-fit !bg-white !text-accent"
              onClickAction={handleCancel}
            />
            <Button
              type="button"
              variant="primary-rounded"
              message="Dezaktywuj"
              className="h-fit"
              onClickAction={handleDisableClick}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SetFormDisabledForm;
