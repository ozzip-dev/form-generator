"use client";

import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";
import { Button, Icon } from "@/components/shared";
import { startTransition, useActionState } from "react";

const FormTrigger = () => {
  const [state, createForm, isPending] = useActionState(async () => {
    await createFormDraftAction("empty");
  }, null);

  const handleCreateForm = () => {
    startTransition(createForm);
  };

  return (
    <>
      <Button
        onClickAction={handleCreateForm}
        isLoading={isPending}
        variant="ghost"
        className="bg-accent_light flex justify-center items-center w-[20rem] h-[20rem] rounded-md border border-accent"
        icon={
          <Icon
            icon="plus-solid-full"
            size={60}
            color="var(--color-accent)"
            className="bg-accent"
          />
        }
      />
      <h3 className="mt-8 text-center truncate">Nowy formularz</h3>
    </>
  );
};

export default FormTrigger;
