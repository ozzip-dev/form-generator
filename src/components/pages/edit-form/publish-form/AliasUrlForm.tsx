"use client";

import { setAliasUrlAction } from "@/actions/edit-form/publish-form/setAliasUrlAction";
import { InputFields } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useEditForm } from "@/hooks/useEditForm";
import {
  setAliasSchema,
  SetAliasSchema,
} from "@/lib/zod-schema/setAliasSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import RemoveAliasButton from "./RemoveAliasButton";

const dataInputUrl = [
  {
    name: "url",
    floatingLabel: "Edytuj adres formularza",
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
    <form className="sm:flex sm:items-center sm:justify-between lg:justify-start">
      <div className="mr-[3rem] w-full sm:w-1/2 lg:w-[340px]">
        <InputFields
          inputsData={dataInputUrl}
          register={register}
          errorMsg={errors}
          onChange={handleEditLabel}
        />
      </div>
      <div className="sm:w-1/2">
        {form.url && <RemoveAliasButton form={form} />}
      </div>
    </form>
  );
}
