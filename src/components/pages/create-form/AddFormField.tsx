"use client";

import InputError from "@/components/inputs/InputError";
import InputFields from "@/components/inputs/InputFields";
import ButtonSubmit from "@/components/ui/buttons/ButtonSubmit";
import { InputType } from "@/enums";
import { Input } from "@/types/input";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addFormFieldSchema,
  TAddFormFieldSchema,
} from "@/lib/zodShema/addFormFieldShema";

const dataInputsheader = [
  {
    name: "header",
    placeholder: "Nazwa pola",
    type: "text",
  },
];

type Props = {
  addInput: (input: Input) => Promise<void>;
};

const AddFormField = (props: Props) => {
  const inputTypes = Object.values(InputType);

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
      await props.addInput({
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
          <ButtonSubmit isSubmitting={isSubmitting} text="+" />
        </div>
      </div>
      <InputError errorMsg={errors?.root?.message} />
    </form>
  );
};

export default AddFormField;
