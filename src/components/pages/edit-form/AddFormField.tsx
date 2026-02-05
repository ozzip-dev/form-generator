"use client";

import { addFormFieldAction } from "@/actions/edit-form/addFormFieldAction";
import { Button, Icon } from "@/components/shared";
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
    <div className="w-fit mx-auto mb-16 relative">
      {!!addFieldPublishError && (
        <Icon icon="exclamation" size={23} color="var(--color-error)"
          className="text-error absolute -right-10 top-0 top-1/2 -translate-y-1/2" />
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




