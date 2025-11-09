"use client";

import { Button } from "@/components/shared";
import UsePublishForm from "@/hooks/usePublishForm";
import { FormSerialized } from "@/types/form";

type Props = {
  form: FormSerialized;
};

const PublishFormButton = ({ form }: Props) => {
  const { handlePublishForm, isloading } = UsePublishForm(form);

  return (
    <Button
      message="Publikuj"
      onClickAction={handlePublishForm}
      isLoading={isloading}
    />
  );
};

export default PublishFormButton;
