"use client";

import { editFormHeaderAction } from "@/actions/edit-form/editFormHeaderAction";
import { useFormData } from "@/context/FormDataContextProvider";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { use, useState, useTransition } from "react";
import AddTextEditorBtn from "../AddTextEditorBtn";
import RemoveTextEditorBtn from "../text-editor/RemoveTextEditorBtn";
import TextEditor from "../text-editor/TextEditor";

const HeaderEditor = () => {
  const { formDataPromise } = useFormData();
  const form = use(formDataPromise);
  const formId = form?._id;
  const [isEditor, setEditor] = useState(false);
  const [isPending, startTransition] = useTransition();

  useAutoLoader(isPending);

  const handleRemove = () => {
    if (!form?.description) {
      setEditor(false);
      return;
    }

    startTransition(async () => {
      if (formId) {
        await editFormHeaderAction(formId, { description: "" });
      }
    });
    setEditor(false);
  };

  return (
    <>
      {!isEditor && !form?.description && (
        <AddTextEditorBtn action={() => setEditor(true)} />
      )}
      {(isEditor || form?.description) && (
        <div className="relative">
          <div className="absolute right-0">
            <RemoveTextEditorBtn handleRemoveDescription={handleRemove} />
          </div>

          <div className="flex-1">
            <TextEditor
              formId={formId!}
              description={form?.description ?? ""}
              editAction={editFormHeaderAction}
              placeholder="Opis formularza"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderEditor;
