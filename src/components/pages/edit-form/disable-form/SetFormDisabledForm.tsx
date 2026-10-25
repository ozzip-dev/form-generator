"use client";

import { useState, useRef } from "react";
import { disableFormAction } from "@/actions/form/disableFormAction";
import { Button, Card } from "@/components/shared";
import TextEditor from "../text-editor/TextEditor";
import { useModal } from "@/context/ModalContextProvider";

type Props = {
  formId: string;
};

function SetFormDisabledForm({ formId }: Props) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const editorContentRef = useRef<string>("");
  const { openModal } = useModal();

  const handleCancel = () => {
    setIsEditorOpen(false);
    editorContentRef.current = "";
  };

  return (
    <>
      {!isEditorOpen ? (
        <Button
          type="button"
          variant="primary-rounded"
          className="ml-auto size-fit"
          onClickAction={() => setIsEditorOpen(true)}
        >
          {" "}
          Zamknij opublikowany formularz
        </Button>
      ) : (
        <Card className="border-gray-200 w-full space-y-4 rounded border bg-white p-4">
          <div className="w-full">
            <h3 className="mb-3 text-sm font-semibold">
              Wpisany tekst będzie wyświetlany pod adresem formularza. Po
              zamknięciu formularza wyniki wciąż będą dostępne.
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
              className="h-fit !bg-white !text-accent"
              onClickAction={handleCancel}
            >
              Anuluj
            </Button>
            <Button
              type="button"
              variant="primary-rounded"
              className="h-fit"
              onClickAction={() => {
                openModal({
                  action: async () => {
                    await disableFormAction(formId, editorContentRef.current);
                    setIsEditorOpen(false);
                    editorContentRef.current = "";
                  },
                  header: (
                    <>
                      Czy zamknąć formularz?
                      <br />
                      <div className="font-semibold">
                        Użytkownicy nie będą mogli przesyłać odpowiedzi, ale
                        wyniki będą wciąż dostępne (do czasu usunięcia
                        formularza)
                      </div>
                    </>
                  ),
                  confirmBtnMessage: "Zamknij",
                });
              }}
            >
              Zamknij opublikowany formularz
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}

export default SetFormDisabledForm;
