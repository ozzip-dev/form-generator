"use client";

import { removeFormAction } from "@/actions/edit-form/editFormInput/removeFormAction";
import { Button } from "@/components/shared";
import { useModal } from "@/context/ModalContextProvider";

type Props = {
  formId: string;
};

function RemoveFormButton(props: Props) {
  const { openModal } = useModal();

  return (
    <Button
      message="Usuń formularz"
      type="button"
      variant="primary-rounded"
      onClickAction={() =>
        openModal({
          action: () => removeFormAction(props.formId),
          header: "Usunąć formularz?",
        })
      }
      className="!bg-error"
    />
  );
}

export default RemoveFormButton;
