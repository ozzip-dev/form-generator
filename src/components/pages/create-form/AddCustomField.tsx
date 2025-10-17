"use client";

import InputError from "@/components/inputs/InputError";
import InputFields from "@/components/inputs/InputFields";
import ButtonSubmit from "@/components/ui/buttons/ButtonSubmit";
import { InputType } from "@/enums";
import { Input } from "@/types/input";
import { Pompiere } from "next/font/google";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

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

type FormValues = {
  type: InputType;
  header: string;
};

const AddCustomField = (props: Props) => {
  const inputTypes = Object.values(InputType);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      await props.addInput({
        ...data,
        validation: {},
      });
    } catch (err: any) {
      setError("root", {
        message: `Błąd: ${err.message || err}`,
      });
    }

    reset();
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
        <div>aa{errors.root?.message}</div>
        <div className="w-fit">
          <ButtonSubmit isSubmitting={isSubmitting} text="+" />
        </div>
      </div>
      <InputError errorMsg={errors?.root?.message} />
    </form>
  );
};

export default AddCustomField;
