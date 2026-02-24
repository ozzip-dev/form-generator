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
        className="flex h-[13rem] w-[13rem] items-center justify-center border border-accent !bg-accent_light shadow-default sm:rounded-md md:rounded-lg"
        icon={
          <div>
            <span className="text-accent_dark">Dodaj</span>
            <Icon
              icon="plus-solid-full"
              size={60}
              color="var(--color-accent)"
              className="bg-accent"
            />
          </div>
        }
      />
      {state?.error ? (
        <div className="text-center text-error">
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
