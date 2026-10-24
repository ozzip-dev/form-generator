"use client";

import { addFormFieldAction } from "@/actions/edit-form/addFormFieldAction";
import { Button, Icon } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import {
  useAddFieldPublishError,
  usePublishFormErrorSetters,
} from "@/context/PublishFormErrorContextProvider";
import { InputType } from "@/enums";
import { markLastEditFieldForFocus } from "@/lib/edit-form-focus";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useErrorBoundary } from "react-error-boundary";

type Props = {
  formId: string;
  idx: number;
};

const AddFormField = ({ formId }: Props) => {
  const { setAddFieldPublishError } = usePublishFormErrorSetters();
  const { error: addFieldPublishError } = useAddFieldPublishError();
  const router = useRouter();
  const { showBoundary } = useErrorBoundary();

  const [isPending, startTransition] = useTransition();
  useAutoLoader(isPending);

  const handleAddField = () => {
    if (!formId) return;

    startTransition(async () => {
      try {
        const result = await addFormFieldAction(formId as string, {
          header: ``,
          type: "text" as InputType,
          validation: {},
          options: [],
        });
        setAddFieldPublishError("");
        if (result && "validationErrors" in result) return;
        markLastEditFieldForFocus(formId);
        router.refresh();
      } catch (err) {
        showBoundary(err);
      }
    });
  };

  return (
    <div className="relative mb-16">
      {!!addFieldPublishError && (
        <Icon
          icon="exclamation"
          size={23}
          className="absolute -right-10 top-1/2 -translate-y-1/2 bg-error text-error"
        />
      )}
      <Button
        onClickAction={handleAddField}
        variant="empty-accent"
        className="w-full"
        ariaLabel="Przycisk dodaj pytanie"
      >
        {" "}
        <Icon
          icon="plus-solid-full"
          size={15}
          className="bg-accent group-hover:bg-white"
        />{" "}
        Dodaj pytanie
      </Button>
    </div>
  );
};

export default AddFormField;
