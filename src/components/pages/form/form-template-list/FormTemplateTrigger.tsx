"use client";

import { startTransition, useActionState } from "react";
import Link from "next/link";
import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";
import { Button } from "@/components/shared";

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
        className="flex h-[13rem] w-[13rem] items-center justify-center rounded-md border !bg-white !text-black transition hover:!bg-accent_light md:rounded-lg"
        ariaLabel={props.title}
      />

      <Link
        href={`/forms/${props._id}/preview`}
        target="_blank"
        className="btn-primary w-fit rounded-sm !bg-white !px-3 !py-2 !text-accent"
      >
        Podgląd
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
