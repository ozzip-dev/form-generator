import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";

import { Button, IconTrash, InputFields } from "../../../shared";
import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import TextEditor from "../textEditor/TextEditor";
import TextEditorPrinter from "../textEditor/TextEditorPrinter";

type Props = {
  formId?: string;
  inputId: string;
  inputIdx: number;
  description: string;
  isParagraph: boolean;
  setDescription:any;
  setEditor:any;
  isDescription: any
  isEditor: any
};

const EditFormDescriptionInput = (props: Props) => {


  const formId = useSafeURLParam("formId") || "";
  const {
    register,
    formState: { errors },
    trigger,
    setError,
  } = useFormContext();


 
  const [_, editDescription, isPending] = useActionState(async () => {

    if (!props.formId) return
    await editInputLabelAction(props.formId, props.inputId, {
      description: "",
    });
    props.setDescription(false);
    props.setEditor(false)
  }, undefined);



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
  startTransition( ()=>{
    editDescription()
  }

  )
  }
  const hasDescription = !!props.description;
  // const shouldShowInput = hasDescription || isDescription;
  // const canAddDescription = !props.isParagraph && !shouldShowInput;



  // console.log('isDescriptionInput',!isDescription)
  // console.log('isEditor',isEditor)

  useAutoLoader(isPending);
  
  const descriptionInput = (
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
  );

  return (
    <>
      {/* {shouldShowInput && descriptionInput} */}

      {(props.isDescription || props.isParagraph) && descriptionInput}

      {/* {!props.isDescription && (
        <Button
          type="button"
          message="Edytuj opis"
          onClickAction={printDescriptionInput}
          variant="primary-rounded"
          className="w-full md:w-4/6  mb-10"
        />
      )} */}

      {/* {props.isParagraph && !shouldShowInput && descriptionInput} */}
    </>
  );
};

export default EditFormDescriptionInput;
