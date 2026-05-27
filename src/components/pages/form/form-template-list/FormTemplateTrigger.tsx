"use client";

import { startTransition, useActionState } from "react";
import Link from "next/link";
import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";
import { Button, Icon } from "@/components/shared";

type Props = {
  _id: string;
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
        message={props.title}
        variant="ghost"
        className="flex aspect-square w-[11rem] items-center justify-center rounded-md border !bg-white !text-black transition hover:!bg-accent hover:!text-white md:rounded-lg"
        ariaLabel={props.title}
      />

      <Link
        href={`/${props._id}`}
        target="_blank"
        className="mt-4 inline-flex items-center gap-2"
      >
        <span>Podgląd</span>
        <Icon icon="preview" size={22} className="shrink-0 bg-accent" />
      </Link>

      {state?.error && (
        <div className="text-center text-error">
          <div className="mt-4">{state.error}</div>
        </div>
      )}
    </>
  );
};

export default FormTemplateTrigger;
