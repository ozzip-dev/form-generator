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
        className="group flex h-[13rem] w-full items-center justify-center rounded-md border !bg-accent_light px-8 py-6 text-xs transition hover:bg-accent_light md:rounded-lg"
        icon={
          <div>
            <Icon
              icon="plus-solid-full"
              size={40}
              color="var(--color-accent)"
              className="mb-3 transition-transform duration-200 group-hover:scale-125"
            />
            <span className="text-xs font-semibold text-accent">DODAJ</span>
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
