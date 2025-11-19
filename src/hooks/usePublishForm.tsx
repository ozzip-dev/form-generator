import { useToast } from "./useToast";
import { useState } from "react";
import { handleNextRedirectError } from "@/helpers/helpersAuth/handleNextRedirectError";
import { FormSerialized } from "@/types/form";
import { publishFormAction } from "@/actions/form/publishFormActionXX";

const UsePublishForm = (form: FormSerialized) => {
  const [isloading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePublishForm = async () => {
    setLoading(true);
    try {
      await publishFormAction(form);
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
