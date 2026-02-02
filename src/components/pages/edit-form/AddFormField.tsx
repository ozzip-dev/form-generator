"use client";

import { addFormFieldAction } from "@/actions/edit-form/addFormFieldAction";
import { Button } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useAddFieldPublishError, usePublishFormErrorSetters } from "@/context/PublishFormErrorContextProvider";
import { InputType } from "@/enums";
import { useTransition } from "react";
import { useErrorBoundary } from "react-error-boundary";


type Props = {
  formId: string
  idx: number
}


const AddFormField = ({ formId, idx }: Props) => {
  const { setAddFieldPublishError } =
    usePublishFormErrorSetters();
  const { error: addFieldPublishError } = useAddFieldPublishError();
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
        setAddFieldPublishError("")
      } catch (err) {
        showBoundary(err);
      }
    });
  }


  return (
    <div className="flex flex-col items-center gap-3 mb-16">
      {!!addFieldPublishError && (
        <>
          <p className="font-medium text-error">Błąd przy publikacji formularza</p>
          <p className="text-sm text-error">{addFieldPublishError}</p>
        </>


      )}
      <Button
        onClickAction={handleAddField}
        message="Dodaj pytanie"
        variant="primary-rounded"
        className="bg-accent !rounded-full p-2 px-8 mx-auto"
      />
    </div>
  );
};

export default AddFormField;




