"use client";

import { AddInputToDraft } from "@/actions/create-form";
import InputError from "@/components/inputs/InputError";
import InputFields from "@/components/inputs/InputFields";
import ButtonSubmit from "@/components/ui/buttons/ButtonSubmit";
import { InputType } from "@/enums";
import IconPlus from "@/icons/iconPlus/IconPlus";
import {
  addFormFieldSchema,
  TAddFormFieldSchema,
} from "@/lib/zodShema/addFormFieldShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const dataInputsheader = [
  {
    name: "header",
    placeholder: "Nazwa pola",
    type: "text",
  },
];

const AddFormField = () => {
  const inputTypes = Object.values(InputType);
  const { formId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<TAddFormFieldSchema>({
    resolver: zodResolver(addFormFieldSchema),
  });

  const onSubmit: SubmitHandler<TAddFormFieldSchema> = async (
    data: TAddFormFieldSchema
  ) => {
    try {
      await AddInputToDraft(formId as string, {
        ...data,
        type: data.type as InputType,
        validation: {},
      });

      reset();
    } catch (err: any) {
      setError("root", {
        message: `Błąd: ${err.message || err}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex mb-6">
      <div className="flex mb-6">
        <InputFields
          inputsData={dataInputsheader}
          register={register}
          errorMsg={errors}
        />

        <select {...register("type")}>
          {inputTypes.map((el) => (
            <option value={el} key={el}>
              {el}
            </option>
          ))}
        </select>

        <div className="w-fit">
          <ButtonSubmit
            isSubmitting={isSubmitting}
            icon={<IconPlus style="h-7 w-7 bg-white" />}
          />
        </div>
      </div>
      <InputError errorMsg={errors?.root?.message} />
    </form>
  );
};

export default AddFormField;
