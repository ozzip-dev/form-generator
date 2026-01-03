"use client";

import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";
import { Button } from "@/components/shared";
import { startTransition, useActionState } from "react";

const FormTrigger = () => {
  const [state, createForm, isPending] = useActionState(async () => {
    await createFormDraftAction("empty");
  }, null);

  const handleCreateForm = () => {
    startTransition(createForm);
  };

  return (
    <Button
      message="Utwórz formularz"
      onClickAction={handleCreateForm}
      isLoading={isPending}
    />
  );
};

export default FormTrigger;
