"use client";

import { removeFormAction } from "@/actions/edit-form/editFormInput/removeFormAction";
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
      variant="primary"
      message="Usuń formularz"
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
              {title}
            </>
          ),
        })
      }
    />
  );
}

export default RemoveFormButton;
