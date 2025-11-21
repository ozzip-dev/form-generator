"use client";

import { setAliasUrlAction } from "@/actions/edit-form/publishForm/setAliasUrlAction";
import { Button, InputFields } from "@/components/shared";
import { useToast } from "@/hooks/useToast";
import { setAliasSchema, SetAliasSchema } from "@/lib/zodSchema/setAliasSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const dataInputUrl = [
  {
    name: "url",
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
  } = useForm<SetAliasSchema>({
    resolver: zodResolver(setAliasSchema),
    mode: "all",
  });

  const setAlias = async (data: SetAliasSchema) => {
    try {
      const newAlias = await setAliasUrlAction(form, data.url);
      if (!newAlias) {
        console.log("wwaaaaaaaaa");
        throw new Error("sssss");
      }

      console.log("ww", newAlias);
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
          <Button
            message="Zapisz link do formularza"
            isLoading={isSubmitting}
          />
        </div>
      </form>
    </>
  );
}
