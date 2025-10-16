"use client";

import { FormInput } from "@/types/input";
import RemoveInputBtn from "./RemoveInputBtn";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputType } from "@/enums";

type Props = {
  inputs: FormInput[];
  input: FormInput;
  removeInput: (id: string) => Promise<void>;
  moveInputDown: (id: string) => Promise<void>;
  moveInputUp: (id: string) => Promise<void>;
};
type FormValues = {
  type: InputType;
  header: string;
  description: string;
  // TODO: for select types add options field
};
function CreateFormInput(props: Props) {
  const { id, description, type, header, required, order } = props.input;
  const lastInput = order >= props.inputs.length - 1;
  const inputTypes = Object.values(InputType);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  // const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
  //   props.addInput({
  //     ...data,
  //     validation: {},
  //   });
  // };
  // console.log("", props.input);

  return (
    <div className="flex gap-2">
      <div className="w-96 flex">
        <div>
          <input
            type="text"
            value={header}
            className="border border-black mr-4"
          />
          {required && "Required"}
        </div>

        <select
          defaultValue={props.input.type}
          {...register("type", { required: true })}
          className="h-fit border border-black "
        >
          {inputTypes.map((el, i) => (
            <option value={el} key={i}>
              {el}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col justify-center gap-2">
        <button
          disabled={!order}
          className="btn btn-main"
          onClick={() => {
            props.moveInputUp(id as string);
          }}
        >
          ⇧
        </button>

        <button
          disabled={lastInput}
          className="btn btn-main"
          onClick={() => {
            props.moveInputDown(id as string);
          }}
        >
          ⇩
        </button>
      </div>
      <div>
        <RemoveInputBtn id={id as string} removeInput={props.removeInput} />
      </div>
    </div>
  );
}

export default CreateFormInput;
