"use client";

import { Button } from "@/components/shared";
import UseCreateForm from "@/hooks/useCreateForm";

const FormTrigger = () => {
  const { handleCreateForm, isloading } = UseCreateForm("empty");

  return (
    <Button
      message="Utwórz formularz"
      onClickAction={handleCreateForm}
      isLoading={isloading}
    />
  );
};

export default FormTrigger;
