"use client";

import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";
import { Button } from "@/components/shared";
import { useTransition } from "react";

type Props = {
  id: string;
  title: string;
};

const FormTemplateTrigger = (props: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleCreateForm = () => {
    startTransition(async () => {
      await createFormDraftAction(props.id);
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
    </>
  );
};

export default FormTemplateTrigger;
