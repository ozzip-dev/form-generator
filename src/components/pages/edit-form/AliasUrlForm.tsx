"use client";

import { setAliasUrlAction } from "@/actions/form/setAliasUrlActionXX";
import { Button } from "@/components/shared";
import { useToast } from "@/hooks/useToast";
import { setAliasSchema, SetAliasSchema } from "@/lib/zodSchema/setAliasSchema";
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
      await setAliasUrlAction(form, data.url);
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
          <Button
            message="Zapisz link do formularza"
            isLoading={isSubmitting}
          />
        </div>
      </form>
    </>
  );
}
