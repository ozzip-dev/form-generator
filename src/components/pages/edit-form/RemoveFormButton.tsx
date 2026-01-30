"use client";

import { removeFormAction } from "@/actions/edit-form/editFormInput/removeFormAction";
import { Button, Icon } from "@/components/shared";
import { useModal } from "@/context/ModalContextProvider";

type Props = {
  formId: string;
};

function RemoveFormButton(props: Props) {
  const { openModal } = useModal();

  return (
    <Button
      type="button"
      variant="ghost"
      icon={
        <Icon icon="trash-can-regular-full" size={25} className="" />
      }
      onClickAction={() =>
        openModal({
          action: () => {
            removeFormAction(props.formId);
          },
          header: "Usunąć formularz?",
        })
      }
    />
  );
}

export default RemoveFormButton;
