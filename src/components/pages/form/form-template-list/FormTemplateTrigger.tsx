"use client";

import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";
import { Button } from "@/components/shared";
import { startTransition, useActionState } from "react";

type Props = {
  templateName: string;
};

const FormTemplateTrigger = (props: Props) => {
  const [state, createForm, isPending] = useActionState(async () => {
    await createFormDraftAction(props.templateName);
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
        className=" flex justify-center items-center w-[15rem] h-[15rem]
         rounded-md border bg-bg_light  hover:bg-accent transition"
      />
      <h3 className="mt-4 text-center truncate">{props.templateName}</h3>
    </>
  );
};

export default FormTemplateTrigger;
