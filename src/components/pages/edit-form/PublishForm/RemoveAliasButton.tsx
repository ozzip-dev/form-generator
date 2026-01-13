"use client";

import { removeAliasUrlAction } from "@/actions/edit-form/publishForm/removeAliasUrlAction";
import { Button } from "@/components/shared";
import { FormSerialized } from "@/types/form";
import { startTransition, useActionState, useTransition } from "react";

type Props = {
  form: FormSerialized;
};

const RemoveAliasButton = ({ form }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleRemoveAliasUrl = () => {
    startTransition(async () => {
      await removeAliasUrlAction(form);
    });
  };

  return (
    <Button
      message="Usuń alias"
      onClickAction={handleRemoveAliasUrl}
      isLoading={isPending}
      variant="primary-rounded"
      type="button"
    />
  );
};

export default RemoveAliasButton;
