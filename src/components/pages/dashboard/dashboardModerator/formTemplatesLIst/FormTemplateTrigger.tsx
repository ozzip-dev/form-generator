"use client";

import ButtonClick from "@/components/ui/buttons/ButtonClick";
import UseCreateForm from "@/hooks/useCreateForm";

type Props = {
  templateName: string;
};

const FormTemplateTrigger = (props: Props) => {
  const { handleCreateForm, isloading } = UseCreateForm(props.templateName);

  return (
    <ButtonClick
      text={props.templateName}
      onClickAction={handleCreateForm}
      isLoading={isloading}
    />
  );
};

export default FormTemplateTrigger;
