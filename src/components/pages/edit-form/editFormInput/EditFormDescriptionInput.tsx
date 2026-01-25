import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { Dispatch, SetStateAction, startTransition, useActionState, useTransition } from "react";
import { useFormContext } from "react-hook-form";
import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { Button, IconTrash } from "../../../shared";
import TextEditor from "../textEditor/TextEditor";
import TextEditorPrinter from "../textEditor/TextEditorPrinter";
import { useInputData } from "@/context/InputDataContextProvider";
import { isInputTypeParagraph } from "@/helpers/inputHelpers";

type Props = {
  setDescription: Dispatch<SetStateAction<boolean>>;
  setEditor: Dispatch<SetStateAction<boolean>>;
  isDescription: boolean
  isEditor: boolean
};

const EditFormDescriptionInput = (props: Props) => {
  const { formId, input } = useInputData()
  const [isPending, startTransition] = useTransition();

  const {
    register,
    formState: { errors },
    trigger,
    setError,
  } = useFormContext();


  useAutoLoader(isPending);


  const printDescriptionEditor = () => {
    props.setEditor((prev) => !prev);
  };




  const handleRemoveDescriptionInput = () => {

    if (!input.description) {
      props.setDescription(false);
      props.setEditor(false)
      return
    };
    startTransition(async () => {
      if (!formId) return
      await editInputLabelAction(formId, input.id!, {
        description: "",
      });
      props.setDescription(false);
      props.setEditor(false)
    }


    )
  }


  useAutoLoader(isPending);
  const isParagraph = isInputTypeParagraph(input)
  const shouldShowEditor =
    isParagraph || !props.isDescription || props.isEditor;



  // console.log('props.isDescription',props.isDescription)
  // console.log('props.isEditor',props.isEditor)

  return (
    <>
      {(props.isDescription || isParagraph) && (

        <div className="flex">
          <div className="w-full mb-8">

            {!props.isDescription || props.isEditor ? (
              <TextEditor
                formId={formId}
                inputId={input.id!}
                description={input.description || ""}
                printDescriptionInput={printDescriptionEditor}
              />
            ) : (
              <TextEditorPrinter
                description={input.description || ""}
                printDescriptionInput={printDescriptionEditor}

              />
            )}
          </div>


          {!isParagraph && <Button
            type="button"
            icon={<IconTrash />}
            onClickAction={handleRemoveDescriptionInput}
            variant="ghost"
            className="w-fit h-fir !bg-red !text-error mb-auto mt-10"
          />}
        </div>
      )}


    </>
  );
};

export default EditFormDescriptionInput;
