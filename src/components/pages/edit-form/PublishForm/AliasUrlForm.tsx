"use client";

import { setAliasUrlAction } from "@/actions/edit-form/publishForm/setAliasUrlAction";
import { InputFields } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useEditForm } from "@/hooks/useEditForm";
import { setAliasSchema, SetAliasSchema } from "@/lib/zodSchema/setAliasSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import RemoveAliasButton from "./RemoveAliasButton";

const dataInputUrl = [
  {
    name: "url",
    floatingLabel: "Wpisz własny adres formularza",
    placeholder: "www:formularz",
    type: "text",
  },
];

export default function AliasUrlForm(form: FormSerialized) {
  const {
    register,
    formState: { errors },
    setError,
    trigger,
    reset,
  } = useForm<SetAliasSchema>({
    resolver: zodResolver(setAliasSchema),
    defaultValues: { url: form.url ? form.url : "" },
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
    reset({ url: form.url ? form.url : "" });
  }, [reset, form.url, form._id]);

  return (
    <form className="max-w-[46rem] sm:flex sm:items-center sm:justify-between">
      <div className="w-full sm:w-[30rem]">
        <InputFields
          inputsData={dataInputUrl}
          register={register}
          errorMsg={errors}
          onChange={handleEditLabel}
        />
      </div>

      {form.url && <RemoveAliasButton form={form} />}
    </form>
  );
}
