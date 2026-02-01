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
import { useEditForm } from "@/hooks/useEditForm";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useEffect } from "react";

const dataInputUrl = [
  {
    name: "url",
    floatingLabel: "Wpisz własny adres formularza",
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
    trigger,
    reset,
  } = useForm<SetAliasSchema>({
    resolver: zodResolver(setAliasSchema),
    defaultValues: { url: form.url ? form.url : form._id! },
    mode: "all",
  });




  const { handleEdit: handleEditLabel, isLoading: isLoadingLabel } =
    useEditForm({
      formId: form._id!,
      trigger,
      action: setAliasUrlAction,
      mode: "formHeader",
      setError,
    });

  const isAnyLoading = [...Object.values(isLoadingLabel ?? {})].some(Boolean);
  useAutoLoader(isAnyLoading, "small");


  useEffect(() => {
    reset({ url: form.url ? form.url : form._id! });
  }, [reset, form.url, form._id]);


  // const setAlias = async (data: SetAliasSchema) => {
  //   try {
  //     const resp = await setAliasUrlAction(form._id!, data);

  //     if ("validationErrors" in resp) {
  //       setClientErrors(resp.validationErrors, setError);
  //       return;
  //     }
  //   } catch (e: any) {
  //     toast({
  //       title: e.message,
  //       variant: "error",
  //     });
  //   }
  // };

  return (
    <form
      // onSubmit={handleSubmit(setAlias)}
      className="md:flex md:gap-16 md:items-center"
    >
      <div className="md:w-1/2">
        <InputFields
          inputsData={dataInputUrl}
          register={register}
          errorMsg={errors}
          onChange={handleEditLabel}
        />
      </div>

      <div className="flex justify-center gap-4 ">
        {/* <Button
          message="Zapisz"
          isLoading={isSubmitting}
          variant="primary-rounded"
        /> */}
        <RemoveAliasButton form={form} />
      </div>
    </form>
  );
}
