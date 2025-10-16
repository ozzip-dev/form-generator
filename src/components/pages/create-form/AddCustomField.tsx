"use client";

import ButtonSubmit from "@/components/ui/buttons/ButtonSubmit";
import { InputType } from "@/enums";
import { Input } from "@/types/input";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

type Props = {
  addInput: (input: Input) => Promise<void>;
};

type FormValues = {
  type: InputType;
  header: string;
  description: string;
  // TODO: for select types add options field
};

const AddCustomField = (props: Props) => {
  const inputTypes = Object.values(InputType);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    props.addInput({
      ...data,
      validation: {},
    });
  };
  // console.log("isSubmitting", isSubmitting);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex [&>input]:my-2">
      <input
        type="text"
        placeholder="Nazwa pola"
        {...register("header", { required: true })}
      />
      <select {...register("type", { required: true })}>
        {inputTypes.map((el, i) => (
          <option value={el} key={i}>
            {el}
          </option>
        ))}
      </select>
      <div className="w-fit">
        <ButtonSubmit isSubmitting={isSubmitting} text="+" />
      </div>
    </form>
  );
};

export default AddCustomField;
