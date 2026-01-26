"use client";

import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";
import { Button, Icon } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { startTransition, useActionState } from "react";

const FormTrigger = () => {
  const [state, createForm, isPending] = useActionState<
    Promise<null | {
      error: string;
    }>
  >(async () => {
    return await createFormDraftAction("empty");
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
        className="
          bg-accent_light flex justify-center items-center 
          w-[13rem] h-[13rem] 
          sm:rounded-md md:rounded-lg 
          border border-accent
           shadow-default
        "
        icon={
          <Icon
            icon="plus-solid-full"
            size={60}
            color="var(--color-accent)"
            className="bg-accent"
          />
        }
      />
      {state?.error ? (
        <div className="text-error text-center">
          <div className="mt-4">{state.error}</div>
          <div className="text-2xs">formularzy</div>
        </div>
      ) : (
        <div className="mt-4 px-4 text-center">Nowy formularz</div>
      )}
    </>
  );
};

export default FormTrigger;
