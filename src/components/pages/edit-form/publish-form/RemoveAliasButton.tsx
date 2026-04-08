"use client";

import { removeAliasUrlAction } from "@/actions/edit-form/publish-form/removeAliasUrlAction";
import { Button } from "@/components/shared";
import { FormSerialized } from "@/types/form";
import {
  startTransition,
  useActionState,
  useState,
  useTransition,
} from "react";

type Props = {
  form: FormSerialized;
};

const RemoveAliasButton = ({ form }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState("");

  const handleRemoveAliasUrl = () => {
    setStatusMessage(`Usuwanie aliasu`);
    startTransition(async () => {
      await removeAliasUrlAction(form);
      setStatusMessage(`Alias usunięty`);
    });
  };

  return (
    <>
      <Button
        message="Usuń alias"
        onClickAction={handleRemoveAliasUrl}
        isLoading={isPending}
        variant="primary-rounded"
        type="button"
      />
      <div role="status" aria-live="polite" className="sr-only">
        {statusMessage}
      </div>{" "}
    </>
  );
};

export default RemoveAliasButton;
