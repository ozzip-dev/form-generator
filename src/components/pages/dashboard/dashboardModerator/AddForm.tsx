"use client";

import { CreateDraft } from "@/actions/form";
import ButtonClick from "@/components/ui/buttons/ButtonClick";
import { useState } from "react";

const AddForm = () => {
  const [isloading, setLoading] = useState(false);

  const handleCreateForm = async () => {
    setLoading(true);
    try {
      await CreateDraft("empty");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ButtonClick
      text="Utwórz formularz"
      onClickAction={handleCreateForm}
      isLoading={isloading}
    />
  );
};

export default AddForm;
