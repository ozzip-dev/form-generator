"use client";

import { useFormContext } from "react-hook-form";
import { FormInput } from "@/types/input";
import { InputType } from "@/enums";
import RemoveInputBtn from "./RemoveInputBtn";
import { useEffect } from "react";
import MoveInputUpBtn from "./MoveInputUpBtn";
import MoveInputDownBtn from "./MoveInputDownBtn";
import RequiredToggleSwitch from "../inputs/RequiredToggleSwitch";

type Props = {
  input: FormInput;
  index: number;
  formId: string;
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
      placeholder: "Nazwa pola",
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
    <div className="flex gap-2 items-center p-2 bg-slate-200">
      <div className="w-96 flex">
        <div>
          <input
            type="text"
            {...register(`inputs.${props.index}.header`)}
            className="border border-black mr-4"
          />
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

      <RequiredToggleSwitch formId={props.formId} input={props.input} />

      <div>
        <RemoveInputBtn inputId={id as string} />
      </div>
    </div>
  );
}
