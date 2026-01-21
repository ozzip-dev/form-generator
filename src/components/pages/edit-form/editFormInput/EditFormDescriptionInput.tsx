import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";

import { Button, IconTrash, InputFields } from "../../../shared";
import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import TextEditor from "../textEditor/TextEditor";
import TextEditorPrinter from "../textEditor/TextEditorPrinter";

type Props = {
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

  const { handleEdit: handleEditLabel, isLoading } = useEditForm({
    formId,
    inputId: props.inputId,
    inputIdx: props.inputIdx,
    trigger,
    action:  editInputLabelAction,
    mode: "inputLabel",
    setError,
  });
  
 

  useEffect(() => {
    if (isRemovingDescriptionRef.current) {
      isRemovingDescriptionRef.current = false;
      props.setDescription(false);
    }
  }, [isLoading?.description]);

  useAutoLoader(isRemovingDescriptionRef.current);


  const printDescriptionInput = () => {
    props.setDescription(true);
    props.setEditor(true)
  }

  const printDescriptionEditor = () => {
    props.setEditor((prev) => !prev);
  };

  const handleRemoveDescriptionInput = async () => {
    if (!props.description) {
      props.setDescription(false);
      props.setEditor(false)
      return
    };
    isRemovingDescriptionRef.current = true;
    handleEditLabel("description", "");
  };

  const hasDescription = !!props.description;
  // const shouldShowInput = hasDescription || isDescription;
  // const canAddDescription = !props.isParagraph && !shouldShowInput;



  // console.log('isDescriptionInput',!isDescription)
  // console.log('isEditor',isEditor)

  const descriptionInput = (
    <div className="relative w-[calc(100%-3rem)] md:w-4/6 mt-8">
   
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

      <Button
        type="button"
        icon={<IconTrash />}
        onClickAction={handleRemoveDescriptionInput}
        variant="ghost"
        className="w-fit !absolute top-2 -right-10"
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
