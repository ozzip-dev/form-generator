import { editInputLabelAction } from "@/actions/edit-form/edit-form-input/editInputLabelAction";
import { useInputData } from "@/context/InputDataContextProvider";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { isInputTypeParagraph } from "@/helpers/inputHelpers";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useFormContext } from "react-hook-form";
import RemoveTextEditorBtn from "../text-editor/RemoveTextEditorBtn";
import TextEditor from "../text-editor/TextEditor";
import TextEditorPrinter from "../text-editor/TextEditorPrinter";

type Props = {
  isDescription: boolean;
  setDescription: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  variant: "header" | "input";
};

const InputEditor = (props: Props) => {
  const { formId, input } = useInputData();
  const [isPending, startTransition] = useTransition();

  useAutoLoader(isPending);

  const handleRemoveDescriptionInput = () => {
    if (!input.description) {
      props.setDescription(false);
      props.onClose();
      return;
    }
    startTransition(async () => {
      if (!formId) return;
      await editInputLabelAction(formId, input.id!, {
        description: "",
      });
      props.setDescription(false);
      props.onClose();
    });
  };
  useAutoLoader(isPending);
  const isParagraph = isInputTypeParagraph(input);

  const editorPlaceholder =
    input.type === "paragraph"
      ? "Edytuj tekst informacyjny"
      : "Edytuj opis pod pytaniem";

  return (
    <>
      {(props.isDescription || isParagraph) && (
        <div className="relative">
          <div className="absolute right-0">
            {!isParagraph && (
              <RemoveTextEditorBtn
                handleRemoveDescription={handleRemoveDescriptionInput}
              />
            )}
          </div>

          <TextEditor
            formId={formId}
            inputId={props.variant === "input" ? input.id! : undefined}
            description={input.description || ""}
            editAction={editInputLabelAction}
            placeholder={editorPlaceholder}
          />
        </div>
      )}
    </>
  );
};

export default InputEditor;
