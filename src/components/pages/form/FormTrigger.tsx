"use client";

import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";
import { Button, Icon } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { startTransition, useActionState } from "react";

const FormTrigger = () => {
  const [_, createForm, isPending] = useActionState(async () => {
    await createFormDraftAction("empty");
  }, null);

  useAutoLoader(isPending);

  const handleCreateForm = () => {
    startTransition(createForm);
  };

  return (
    <>
      <Button
        onClickAction={handleCreateForm}
        variant="ghost"
        className="bg-accent_light flex justify-center items-center w-[15rem] h-[15rem] rounded-md border border-accent"
        icon={
          <Icon
            icon="plus-solid-full"
            size={60}
            color="var(--color-accent)"
            className="bg-accent"
          />
        }
      />
      <h3 className="mt-4 text-center truncate">Nowy formularz</h3>
    </>
  );
};

export default FormTrigger;
