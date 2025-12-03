"use client";

import { removeInputFromDraftAction } from "@/actions/edit-form/editFormInput/removeInputFromDraftAction";
import { Button, FullscreenLoader } from "@/components/shared";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { useParams } from "next/navigation";
import { startTransition, useActionState } from "react";

type Props = {
  inputId: string;
};

function RemoveInputBtn(props: Props) {
  const { formId } = useParams();
  const [state, deleteInput, isPending] = useActionState(async () => {
    await removeInputFromDraftAction(formId as string, props.inputId);
  }, null);

  const handleDeleteInput = () => {
    startTransition(deleteInput);
  };

  return (
    <>
      {isPending && <FullscreenLoader />}

      <Button
        type="button"
        icon={<IconTrash style="h-5 w-5 bg-white" />}
        onClickAction={handleDeleteInput}
      />
    </>
  );
}

export default RemoveInputBtn;
