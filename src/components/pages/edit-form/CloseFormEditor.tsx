"use client";

import { disableFormAction } from "@/actions/form/disableFormAction";
import { Button } from "@/components/shared";
import { useModal } from "@/context/ModalContextProvider";
import { Dispatch, SetStateAction, useRef } from "react";
import TextEditor from "./text-editor/TextEditor";

type Props = {
  formId: string;
  setIsEditorOpen: Dispatch<SetStateAction<boolean>>;
};

const CloseFormEditor = ({ formId, setIsEditorOpen }: Props) => {
  const editorContentRef = useRef<string>("");
  const { openModal } = useModal();

  const handleCancel = () => {
    setIsEditorOpen(false);
    editorContentRef.current = "";
  };

  return (
    <>
      <div className="w-full">
        <h3 className="mb-2 font-extrabold">Zamknąć publikację formularza?</h3>
        <p className="text-sm text-font-light">
          {" "}
          Formularz przestanie przyjmować odpowiedzi. Zapisane wyniki wciąż będą
          dostępne.
        </p>

        <p className="my-2 text-sm text-font-light">
          Komunikat pod adresem formularza (opcjonalnie).
        </p>
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
                    Użytkownicy nie będą mogli przesyłać odpowiedzi, ale wyniki
                    będą wciąż dostępne (do czasu usunięcia formularza)
                  </div>
                </>
              ),
              confirmBtnMessage: "Zamknij",
            });
          }}
        >
          Zamknij publikację
        </Button>
      </div>
    </>
  );
};

export default CloseFormEditor;
