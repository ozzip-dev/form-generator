"use client";

import { addFormFieldAction } from "@/actions/edit-form/addFormFieldAction";
import { Button, Icon } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import {
  useAddFieldPublishError,
  usePublishFormErrorSetters,
} from "@/context/PublishFormErrorContextProvider";
import { InputType } from "@/enums";
import { useTransition } from "react";
import { useErrorBoundary } from "react-error-boundary";

type Props = {
  formId: string;
  idx: number;
};

const AddFormField = ({ formId, idx }: Props) => {
  const { setAddFieldPublishError } = usePublishFormErrorSetters();
  const { error: addFieldPublishError } = useAddFieldPublishError();
  const { showBoundary } = useErrorBoundary();

  const [isPending, startTransition] = useTransition();
  useAutoLoader(isPending);

  const handleAddField = () => {
    if (!formId) return;

    startTransition(async () => {
      try {
        await addFormFieldAction(formId as string, {
          header: ``,
          type: "text" as InputType,
          validation: {},
          options: [],
        });
        setAddFieldPublishError("");
      } catch (err) {
        showBoundary(err);
      }
    });
  };

  return (
    <div className="relative mx-auto mb-16 w-fit">
      {!!addFieldPublishError && (
        <Icon
          icon="exclamation"
          size={23}
          color="var(--color-error)"
          className="absolute -right-10 top-0 top-1/2 -translate-y-1/2 text-error"
        />
      )}
      <Button
        onClickAction={handleAddField}
        message="Dodaj pytanie"
        variant="primary-rounded"
        className="mx-auto !rounded-full bg-accent p-2 px-8"
      />
    </div>
  );
};

export default AddFormField;
