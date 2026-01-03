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
    <div className="mb-auto mt-2">
      <Button
        message="Usuń alias"
        onClickAction={handleRemoveAliasUrl}
        isLoading={isPending}
        variant="primary-rounded"
      />
    </div>
  );
};

export default RemoveAliasButton;
