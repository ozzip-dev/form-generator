"use client";

import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";
import { Button } from "@/components/shared";
import { startTransition, useActionState } from "react";

type Props = {
  templateName: string;
};

const FormTemplateTrigger = (props: Props) => {
  const [state, createForm, isPending] = useActionState(async () => {
    await createFormDraftAction(props.templateName);
  }, null);

  const handleCreateForm = () => {
    startTransition(createForm);
  };

  return (
    <Button
      message={props.templateName}
      onClickAction={handleCreateForm}
      isLoading={isPending}
    />
  );
};

export default FormTemplateTrigger;
