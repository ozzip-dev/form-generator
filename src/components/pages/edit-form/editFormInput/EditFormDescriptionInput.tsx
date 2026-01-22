import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { Dispatch, SetStateAction, startTransition, useActionState, useTransition } from "react";
import { useFormContext } from "react-hook-form";
import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { Button, IconTrash } from "../../../shared";
import TextEditor from "../textEditor/TextEditor";
import TextEditorPrinter from "../textEditor/TextEditorPrinter";

type Props = {
  formId?: string;
  inputId: string;
  inputIdx: number;
  description: string;
  isParagraph: boolean;
  setDescription: Dispatch<SetStateAction<boolean>>;
  setEditor: Dispatch<SetStateAction<boolean>>;
  isDescription: boolean
  isEditor: boolean
};

const EditFormDescriptionInput = (props: Props) => {
  const [isPending, startTransition] = useTransition();

  
  const formId = useSafeURLParam("formId") || "";
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




  const handleRemoveDescriptionInput = () =>{
    if (!props.description) {
          props.setDescription(false);
          props.setEditor(false)
          return
        };
  startTransition( async () => {

      if (!props.formId) return
      await editInputLabelAction(props.formId, props.inputId, {
        description: "",
      });
      props.setDescription(false);
      props.setEditor(false)
    }
  

  )
  }
 

  useAutoLoader(isPending);
  


  return (
    <>
    
      {(props.isDescription || props.isParagraph) && (

<div className="flex">
<div className="w-full mb-8">

 {!props.isDescription || props.isEditor? (
     <TextEditor
       formId={formId}
       inputId={props.inputId}
       description={props.description}
       printDescriptionInput={printDescriptionEditor}
     />
   ) : (
     <TextEditorPrinter
       description={props.description}
       printDescriptionInput={printDescriptionEditor}
    
     />
   )} 
</div>
   

   {  !props.isParagraph && <Button
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
