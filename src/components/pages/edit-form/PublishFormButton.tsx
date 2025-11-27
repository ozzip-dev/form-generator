"use client";

import { Button } from "@/components/shared";
import ModalWrapper from "@/components/shared/ModalWrapper";
import UsePublishForm from "@/hooks/usePublishForm";
import { FormSerialized } from "@/types/form";
import { useState } from "react";
import Link from "next/link";

type Props = {
  form: FormSerialized;
};

const PublishFormButton = ({ form }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const { handlePublishForm, isloading } = UsePublishForm(form);

  const handlePrintModal = () => {
    setOpen((prev) => !prev);
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
        isLoading={isloading}
      />
      <button onClick={handlePrintModal}>eee</button>
    </>
  );
};

export default PublishFormButton;
