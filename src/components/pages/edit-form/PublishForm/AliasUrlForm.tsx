"use client";

import { setAliasUrlAction } from "@/actions/edit-form/publishForm/setAliasUrlAction";
import { Button, InputFields } from "@/components/shared";
import { handleClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { useToast } from "@/hooks/useToast";
import { setAliasSchema, SetAliasSchema } from "@/lib/zodSchema/setAliasSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const dataInputUrl = [
  {
    name: "url",
    label: "Wpisz własny adres formularza",
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

      if ("error" in resp) {
        handleClientErrors<SetAliasSchema>(resp.error, setError);
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
    <>
      <form
        onSubmit={handleSubmit(setAlias)}
        className="flex items-center gap-4"
      >
        <InputFields
          inputsData={dataInputUrl}
          register={register}
          errorMsg={errors}
        />
        {/* TODO: add remove alias */}
        <div>
          <Button message="Zapisz" isLoading={isSubmitting} />
        </div>
      </form>
    </>
  );
}
