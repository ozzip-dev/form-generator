"use client";

import ButtonClick from "@/components/ui/buttons/ButtonClick";
import UseCreateForm from "@/hooks/useCreateForm";

const FormTrigger = () => {
  const { handleCreateForm, isloading } = UseCreateForm("empty");

  return (
    <ButtonClick
      message="Utwórz formularz"
      onClickAction={handleCreateForm}
      isLoading={isloading}
    />
  );
};

export default FormTrigger;
