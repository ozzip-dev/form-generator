"use client";

import { removeFormAction } from "@/actions/edit-form/editFormInput/removeFormAction";
import { Button, FullscreenLoader } from "@/components/shared";
import { confirmAction } from "@/helpers/confirmAction";
import { startTransition, useActionState } from "react";

type Props = {
  formId: string;
};

function RemoveFormButton(props: Props) {
  const [_, deleteForm, isPending] = useActionState(async () => {
    await removeFormAction(props.formId);
  }, null);

  const handleDeleteForm = () => {
    confirmAction({
      action: () => startTransition(deleteForm),
      confirmText: "Usunąć formularz?",
    });
  };

  return (
    <>
      {isPending && <FullscreenLoader />}

      <Button
        message="Usuń formularz"
        type="button"
        variant="primary-rounded"
        onClickAction={handleDeleteForm}
        className="!bg-error"
      />
    </>
  );
}

export default RemoveFormButton;
