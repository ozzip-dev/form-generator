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
import { InputData, InputType } from "@/enums";

const dataInputUrl: InputData[] = [
  {
    name: "url",
    floatingLabel: "Edytuj adres formularza",
    placeholder: "www:formularz",
    type: InputType.TEXT,
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
    <form className="">
      <div className="w-full">
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
