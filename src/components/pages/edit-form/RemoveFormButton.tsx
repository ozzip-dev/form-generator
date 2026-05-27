"use client";

import { removeFormAction } from "@/actions/edit-form/edit-form-input/removeFormAction";
import { Button, Icon } from "@/components/shared";
import { useFormData } from "@/context/FormDataContextProvider";
import { useModal } from "@/context/ModalContextProvider";
import { use } from "react";

type Props = {
  formId: string;
};

function RemoveFormButton(props: Props) {
  const { openModal } = useModal();
  const { formDataPromise } = useFormData();
  const form = use(formDataPromise);
  if (!form) return null;

  const { _id, title, url } = form;

  return (
    <Button
      type="button"
      variant="primary-rounded"
      icon={
        <Icon
          icon="trash"
          size={20}
          className="bg-white transition-colors group-hover:bg-accent"
        />
      }
      message="Usuń formularz"
      className="group ml-auto size-fit"
      onClickAction={() =>
        openModal({
          action: () => {
            if (!_id) return;
            removeFormAction(_id);
          },
          header: (
            <>
              Usunąć formularz?
              <br />
              <div className="font-semibold">{title} </div>
            </>
          ),
          confirmBtnMessage: "Usuń",
        })
      }
    />
  );
}

export default RemoveFormButton;
