"use client";

import { Button } from "@/components/shared";
import UseCreateForm from "@/hooks/useCreateForm";

type Props = {
  templateName: string;
};

const FormTemplateTrigger = (props: Props) => {
  const { handleCreateForm, isloading } = UseCreateForm(props.templateName);

  return (
    <Button
      message={props.templateName}
      onClickAction={handleCreateForm}
      isLoading={isloading}
    />
  );
};

export default FormTemplateTrigger;
