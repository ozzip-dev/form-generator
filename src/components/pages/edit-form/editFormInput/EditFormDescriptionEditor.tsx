import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
import { useInputData } from "@/context/InputDataContextProvider";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { isInputTypeParagraph } from "@/helpers/inputHelpers";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useFormContext } from "react-hook-form";
import RemoveTextEditorBtn from "../textEditor/RemoveTextEditorBtn";
import TextEditor from "../textEditor/TextEditor";
import TextEditorPrinter from "../textEditor/TextEditorPrinter";

type Props = {
  isDescription: boolean
  setDescription: Dispatch<SetStateAction<boolean>>
  onClose: () => void;
  variant: "header" | "input"
};

const EditFormDescriptionEditor = (props: Props) => {
  const { formId, input } = useInputData()
  const [isPending, startTransition] = useTransition();
  const [isEditorOpen, setEditorOpen] = useState(!input.description);

  const {
    register,
    formState: { errors },
    trigger,
    setError,
  } = useFormContext();


  useAutoLoader(isPending);


  const handleRemoveDescriptionInput = () => {

    if (!input.description) {
      props.setDescription(false);
      props.onClose();
      return
    };
    startTransition(async () => {
      if (!formId) return
      await editInputLabelAction(formId, input.id!, {
        description: "",
      });
      props.setDescription(false);
      props.onClose();
    }


    )
  }
  useAutoLoader(isPending);
  const isParagraph = isInputTypeParagraph(input)



  return (
    <>
      {(props.isDescription || isParagraph) && (

        <div className="flex">
          <div className="w-full mb-8">

            {isEditorOpen ? (
              <TextEditor
                formId={formId}
                inputId={props.variant === "input" ? input.id! : undefined}
                description={input.description || ""}
                printDescriptionInput={() => setEditorOpen(false)}
                editAction={editInputLabelAction}
              />
            ) : (
              <TextEditorPrinter
                description={input.description || ""}
                printDescriptionInput={() => setEditorOpen(true)}

              />
            )}
          </div>


          {!isParagraph &&
            <RemoveTextEditorBtn handleRemoveDescription={handleRemoveDescriptionInput} />
          }

        </div>
      )}


    </>
  );
};

export default EditFormDescriptionEditor;
