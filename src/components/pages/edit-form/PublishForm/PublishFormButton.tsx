"use client";

import { Button } from "@/components/shared";
import ModalWrapper from "@/components/shared/ModalWrapper";
import { FormSerialized } from "@/types/form";
import { startTransition, useActionState, useState } from "react";
import Link from "next/link";
import { publishFormAction } from "@/actions/edit-form/publishForm/publishFormAction";

type Props = {
  form: FormSerialized;
};

const PublishFormButton = ({ form }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [state, publishForm, isPending] = useActionState(async () => {
    const url = await publishFormAction(form);
    window.open(url, "_blank");
  }, null);

  const handlePrintModal = () => {
    setOpen((prev) => !prev);
  };

  const handlePublishForm = () => {
    startTransition(publishForm);
  };

  return (
    <>
      <ModalWrapper onClose={handlePrintModal} isOpen={isOpen}>
        <div>
          <Link href={"/user-settings"}>
            Zapisz dane kontaktowe w ustawieniach
          </Link>
        </div>
      </ModalWrapper>
      <Button
        message="Publikuj"
        onClickAction={handlePublishForm}
        isLoading={isPending}
      />
      <button onClick={handlePrintModal}>eee</button>
    </>
  );
};

export default PublishFormButton;
