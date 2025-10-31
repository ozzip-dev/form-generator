'use client';

import { SetAliasUrl } from "@/actions/form/SetAliasUrl";
import InputError from "@/components/inputs/InputError";
import ButtonSubmit from "@/components/ui/buttons/ButtonSubmit";
import { useToast } from "@/hooks/useToast";
import { setAliasSchema, SetAliasSchema } from "@/lib/zodShema/setAliasSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorOption, useForm } from "react-hook-form";

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
      await SetAliasUrl(form, data.url)
    } catch(e: any) {
      toast({
        title: e.message,
        variant: 'error'
      })
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(setAlias)}
        className="flex items-center gap-4"
      >
        <label htmlFor="file">
          <input {...register('url')} type="text" name="url" />
        </label>
        {/* TODO: add remove alias */}
        <div>
          <ButtonSubmit message="Ustaw alias" isSubmitting={isSubmitting} />
        </div>
      </form>
    </>
  )
}