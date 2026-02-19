"use client";

import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";
import { Button } from "@/components/shared";
import { startTransition, useActionState } from "react";

type Props = {
  id: string;
  title: string;
};

const FormTemplateTrigger = (props: Props) => {
  const [state, createForm, isPending] = useActionState<
    Promise<null | {
      error: string;
    }>
  >(async () => {
    return await createFormDraftAction(props.id);
  }, null);

  const handleCreateForm = () => {
    startTransition(async () => {
      startTransition(createForm);
    });
  };

  return (
    <>
      <Button
        onClickAction={handleCreateForm}
        isLoading={isPending}
        variant="ghost"
        className="flex h-[13rem] w-[13rem] items-center justify-center rounded-md border !bg-white transition hover:!bg-accent md:rounded-lg"
      />
      <h3 className="mt-4 line-clamp-2 text-center">{props.title}</h3>

      {state?.error && (
        <div className="text-center text-error">
          <div className="mt-4">{state.error}</div>
          <div className="text-2xs">formularzy</div>
        </div>
      )}
    </>
  );
};

export default FormTemplateTrigger;
