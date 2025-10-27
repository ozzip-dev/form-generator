"use client";

import { ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/useToast";
import { UploadFile } from "@/actions/protocol";
import InputError from "@/components/inputs/InputError";
import ButtonSubmit from "@/components/ui/buttons/ButtonSubmit";
import {
  uploadProtocolSchema,
  UploadProtocolSchema,
} from "@/lib/zodShema/uploadProtocolSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const AddProtocolForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<UploadProtocolSchema>({
    resolver: zodResolver(uploadProtocolSchema),
    mode: "onChange",
  });

  /* Need to overwrite the useForm reset fn, didn't work fine for the file type input */
  const reset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFile = async ({ file }: UploadProtocolSchema) => {
    if (!file) return;

    await UploadFile(file);

    toast({
      title: "Sukces",
      description: "Protokół dodany",
      variant: "success",
    });

    reset();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(uploadFile)}
      className="flex items-center mt-8"
    >
      <label htmlFor="file">
        <div className="text-lg font-black">Dodaj nowy protokół</div>
        <input type="file" ref={fileInputRef} onChange={onChange} />
      </label>
      <div>
        <ButtonSubmit message="Wgraj protokół" isSubmitting={isSubmitting} />
      </div>

      <InputError errorMsg={errors?.file?.message as string} />
    </form>
  );
};

export default AddProtocolForm;
