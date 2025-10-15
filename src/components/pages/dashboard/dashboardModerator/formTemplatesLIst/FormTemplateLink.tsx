"use client";

import { CreateDraft } from "@/actions/form";
import ButtonClick from "@/components/ui/buttons/ButtonClick";
import { handleNextRedirectError } from "@/helpers/helpersAuth/handleNextRedirectError";
import { useToast } from "@/hooks/useToast";
import { useState } from "react";

type Props = {
  templateName: string;
};

const FormTemplateLink = (props: Props) => {
  const [isloading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateForm = async () => {
    setLoading(true);
    try {
      await CreateDraft(props.templateName);
    } catch (err: any) {
      handleNextRedirectError(err);
      toast({
        title: "Błąd",
        description: err.message ?? "Nieznany błąd",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ButtonClick
      text={props.templateName}
      onClickAction={handleCreateForm}
      isLoading={isloading}
    />
  );
};

export default FormTemplateLink;
