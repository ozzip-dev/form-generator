import { useToast } from "./useToast";
import { useState } from "react";
import { handleNextRedirectError } from "@/helpers/helpersAuth/handleNextRedirectError";
import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";

const UseCreateForm = (templateName: string) => {
  const [isloading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateForm = async () => {
    setLoading(true);
    try {
      await createFormDraftAction(templateName);
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
    handleCreateForm,
    isloading,
  };
};

export default UseCreateForm;
