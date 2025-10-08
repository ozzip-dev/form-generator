"use client";

import { InputType } from "@/enums";
import { Input } from "@/types/input";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

type Props = {
  addInput: (input: Input) => Promise<void>
};

type FormValues = {
  type: InputType
  header: string
  description: string
  // TODO: for select types add options field
};

const AddCustomField = (props: Props) => {
  const inputTypes = Object.values(InputType)

  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    props.addInput({
      ...data,
      validation: {}
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="*:block [&>input]:my-2"
    >
      <h2>Dodaj własne customowe pole</h2>

      <select {...register('type', { required: true })}>
        <option value="">Wybierz typ</option>
        {inputTypes.map((el, i) => (
          <option value={el} key={i}>
            {el}
          </option>
        ))}
      </select>
      <input 
        type="text"
        placeholder="nagłówek"
        {...register('header',{ required: true })}
      />
      <input
        type="text"
        placeholder="opis (opcjonalne)"
        {...register('description')}
      />

      <button type="submit" className="btn btn-main">
        Dodaj customowe pole
      </button>
    </form>
  );
};

export default AddCustomField;
