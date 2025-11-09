"use client";

import { SetAliasUrl } from "@/actions/form/SetAliasUrl";
import { ButtonSubmit } from "@/components/shared";
import { useToast } from "@/hooks/useToast";
import { setAliasSchema, SetAliasSchema } from "@/lib/zodShema/setAliasSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function AliasUrlForm(form: FormSerialized) {
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SetAliasSchema>({
    resolver: zodResolver(setAliasSchema),
  });

  const setAlias = async (data: SetAliasSchema) => {
    try {
      await SetAliasUrl(form, data.url);
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
        <label htmlFor="file">
          <input type="text" className="p-1 border" {...register("url")} />
        </label>
        {/* TODO: add remove alias */}
        <div>
          <ButtonSubmit
            message="Zapisz link do formularza"
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </>
  );
}
