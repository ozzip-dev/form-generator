"use client";

import { removeFormAction } from "@/actions/edit-form/editFormInput/removeFormAction";
import { Button, FullscreenLoader } from "@/components/shared";
import { useModal } from "@/context/ModalContextProvider";
import { confirmAction } from "@/helpers/confirmAction";
import { startTransition, useActionState } from "react";

type Props = {
  formId: string;
};

function RemoveFormButton(props: Props) {
  const { openModal } = useModal();
  const [_, deleteForm, isPending] = useActionState(async () => {
    await removeFormAction(props.formId);
  }, null);

  return (
    <>
      {isPending && <FullscreenLoader />}

      <Button
        message="Usuń formularz"
        type="button"
        variant="primary-rounded"
        onClickAction={() =>
          openModal({
            action: () => startTransition(deleteForm),
            header: "Usunąć formularz?",
          })
        }
        className="!bg-error"
      />
    </>
  );
}

export default RemoveFormButton;
