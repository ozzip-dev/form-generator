"use client";

import { disableFormAction } from "@/actions/form/disableFormAction";
import { Button } from "@/components/shared";
import { useFormData } from "@/context/FormDataContextProvider";
import { useModal } from "@/context/ModalContextProvider";
import { use } from "react";

function DisableFormButton() {
  const { openModal } = useModal();
  const { formDataPromise } = useFormData();
  const form = use(formDataPromise);
  if (!form) return null;

  const { _id, title } = form;

  return (
    <Button
      type="button"
      variant="primary-rounded"
      message="Dezaktyuj formularz"
      className="h-fit"
      onClickAction={() =>
        openModal({
          action: () => {
            if (!_id) return;
            disableFormAction(_id);
          },
          header: (
            <>
              Ustaw nieaktywny
              <br />
              <div className="font-semibold">{title} </div>
            </>
          ),
        })
      }
    />
  );
}

export default DisableFormButton;
