"use client";

import { removeAliasUrlAction } from "@/actions/edit-form/publishForm/removeAliasUrlAction";
import { Button } from "@/components/shared";
import { FormSerialized } from "@/types/form";
import { startTransition, useActionState } from "react";

type Props = {
  form: FormSerialized;
};

const RemoveAliasButton = ({ form }: Props) => {
  const [_, removeAliasUrl, isPending] = useActionState(async () => {
    await removeAliasUrlAction(form);
  }, null);

  const handleRemoveAliasUrl = () => {
    startTransition(removeAliasUrl);
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
