"use client";

import { useFormContext } from "react-hook-form";
import { FormInput } from "@/types/input";
import { InputType } from "@/enums";
import RemoveInputBtn from "./RemoveInputBtn";
import { useEffect } from "react";
import MoveInputUpBtn from "./MoveInputUpBtn";
import MoveInputDownBtn from "./MoveInputDownBtn";
import InputFields from "../inputs/InputFields";

type Props = {
  input: FormInput;
  index: number;
  totalInputs: number;
  updateInput?: (id: string, data: Partial<FormInput>) => Promise<void>;
};

export default function EditFormInputs(props: Props) {
  const { id, required, order, type } = props.input;
  const inputTypes = Object.values(InputType);
  const isLastInput = props.index === props.totalInputs - 1;

  const { register, watch } = useFormContext();

  // console.log("", props.input);

  const dataInputField = [
    {
      type: "text",
      name: `inputs.${props.index}.header`,
    },
  ];

  const watchedHeader = watch(`inputs.${props.index}.header`);
  const watchedType = watch(`inputs.${props.index}.type`);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (props.updateInput) {
        props.updateInput(id as string, {
          header: watchedHeader,
          type: watchedType,
        });
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [watchedHeader, watchedType, id, props]);

  return (
    <div className="flex gap-2">
      <div className="w-96 flex">
        <div>
          <InputFields inputsData={dataInputField} register={register} />

          {required && "Required"}
        </div>

        <select
          {...register(`inputs.${props.index}.type`)}
          className="h-fit border border-black"
        >
          {inputTypes.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col justify-center gap-2">
        <MoveInputUpBtn inputId={id as string} removeBtn={order} />

        <MoveInputDownBtn inputId={id as string} isLast={isLastInput} />
      </div>

      <div>
        <RemoveInputBtn id={id as string} />
      </div>
    </div>
  );
}
