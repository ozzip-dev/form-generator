"use client";

import { addFormFieldAction } from "@/actions/edit-form/addFormFieldAction";
import { Button } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { InputType } from "@/enums";
import { useTransition } from "react";
import { useErrorBoundary } from "react-error-boundary";


type Props = {
  formId: string
  idx: number
}


const AddFormField = ({ formId, idx }: Props) => {

  const { showBoundary } = useErrorBoundary();

  const [isPending, startTransition] = useTransition();
  useAutoLoader(isPending);

  const handleAddField = () => {
    if (!formId) return;

    startTransition(async () => {
      try {
        await addFormFieldAction(formId as string, {
          header: `Pytanie ${idx}`,
          type: "text" as InputType,
          validation: {},
          options: [],
        });

      } catch (err) {
        showBoundary(err);
      }
    });
  }


  return (
    <Button
      onClickAction={handleAddField}
      message="Dodaj pytanie"
      variant="primary-rounded"
      className="bg-accent !rounded-full
             p-2 px-8 mx-auto mb-16"
    />

  );
};

export default AddFormField;




