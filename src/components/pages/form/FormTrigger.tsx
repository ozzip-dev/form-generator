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
        className="group m-auto flex aspect-square w-[11rem] items-center justify-center rounded-md border border-[#b08bff] !bg-[#eee7ff] text-xs transition hover:bg-accent_light md:rounded-lg"
        icon={
          <div>
            <Icon
              icon="plus-solid-full"
              size={40}
              className="mb-3 bg-accent transition-transform duration-200 group-hover:scale-125"
            />
            <span className="text-xs font-semibold text-accent">DODAJ</span>
          </div>
        }
      />
      {state?.error ? (
        <div className="text-center text-error">
          <div className="mt-4">{state.error}</div>
        </div>
      ) : (
        <div className="mt-4 px-4 text-center text-sm">Nowy formularz</div>
      )}
    </>
  );
};

export default FormTrigger;
