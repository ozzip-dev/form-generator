import { useToast } from "./useToast";
import { useState } from "react";
import { handleNextRedirectError } from "@/helpers/helpersAuth/handleNextRedirectError";
import { PublishForm } from "@/actions/form/PublishForm";
import { FormSerialized } from "@/types/form";

const UsePublishForm = (form: FormSerialized) => {
  const [isloading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePublishForm = async () => {
    setLoading(true);
    try {
      await PublishForm(form);
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

  return {
    handlePublishForm,
    isloading,
  };
};

export default UsePublishForm;
