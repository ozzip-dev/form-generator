"use client";

import { setAliasUrlAction } from "@/actions/edit-form/publishForm/setAliasUrlAction";
import { Button, InputFields } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import { setClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { setAliasSchema, SetAliasSchema } from "@/lib/zodSchema/setAliasSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RemoveAliasButton from "./RemoveAliasButton";

const dataInputUrl = [
  {
    name: "url",
    floatingLabel: "Wpisz adres formularza",
    placeholder: "www:formularz",
    type: "text",
  },
];

export default function AliasUrlForm(form: FormSerialized) {
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<SetAliasSchema>({
    resolver: zodResolver(setAliasSchema),
    mode: "all",
  });

  const setAlias = async (data: SetAliasSchema) => {
    try {
      const resp = await setAliasUrlAction(form, data);

      if ("validationErrors" in resp) {
        setClientErrors(resp.validationErrors, setError);
        return;
      }
    } catch (e: any) {
      toast({
        title: e.message,
        variant: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(setAlias)}
      className="md:flex md:gap-16 md:items-center"
    >
      <div className="md:w-1/2">
        <InputFields
          inputsData={dataInputUrl}
          register={register}
          errorMsg={errors}
        />
      </div>

      <div className="flex justify-center gap-4  md:mb-auto md:ml-auto">
        <Button
          message="Zapisz"
          isLoading={isSubmitting}
          variant="primary-rounded"
        />
        <RemoveAliasButton form={form} />
      </div>
    </form>
  );
}
