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
  // const [isDescription, setDescription] = useState(
  //   !!props.description
  // );
  // const [isEditor, setEditor] = useState(false);
  const isRemovingDescriptionRef = useRef(false);


  const formId = useSafeURLParam("formId") || "";
  const {
    register,
    formState: { errors },
    trigger,
    setError,
  } = useFormContext();

  // const { handleEdit: handleEditLabel, isLoading } = useEditForm({
  //   formId,
  //   inputId: props.inputId,
  //   inputIdx: props.inputIdx,
  //   trigger,
  //   action:  editInputLabelAction,
  //   mode: "inputLabel",
  //   setError,
  // });
  
 
  const [_, editDescription, isPending] = useActionState(async () => {

    if (!props.formId) return
    await editInputLabelAction(props.formId, props.inputId, {
      description: "",
    });
 
  }, undefined);


  // useEffect(() => {
  //   if (isRemovingDescriptionRef.current) {
  //     isRemovingDescriptionRef.current = false;
  //     props.setDescription(false);
  //   }
  // }, [isLoading?.description]);

  // useAutoLoader(isRemovingDescriptionRef.current);
  // const isDescriptionLoading = [...Object.values(isLoading)].some(Boolean);

  // useAutoLoader(isDescriptionLoading, "small");

  useAutoLoader(isPending);


  const printDescriptionEditor = () => {
    props.setEditor((prev) => !prev);
  };

  // const handleRemoveDescriptionInput = async () => {
  //   if (!props.description) {
  //     props.setDescription(false);
  //     props.setEditor(false)
  //     return
  //   };
  //   isRemovingDescriptionRef.current = true;
  //   handleEditLabel("description", "");
  // };


  const handleRemoveDescriptionInput = () =>{
  
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

  const descriptionInput = (
    <div className="flex">
   <div className="w-full mb-8 pr-2">

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
      

      <Button
        type="button"
        // icon={<IconTrash />}
        onClickAction={handleRemoveDescriptionInput}
        variant="ghost"
        className="w-fit !bg-red !text-error"
        message="K"
      />
    </div>
  );

  return (
    <>
      {/* {shouldShowInput && descriptionInput} */}

      {props.isDescription && descriptionInput}

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
