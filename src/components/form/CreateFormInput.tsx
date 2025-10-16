"use client";

import { useFormContext } from "react-hook-form";
import { FormInput } from "@/types/input";
import { InputType } from "@/enums";
import RemoveInputBtn from "./RemoveInputBtn";
import { useEffect } from "react";

type Props = {
  input: FormInput;
  index: number;
  removeInput: (id: string) => Promise<void>;
  moveInputDown: (id: string) => Promise<void>;
  moveInputUp: (id: string) => Promise<void>;
  updateInput?: (id: string, data: Partial<FormInput>) => Promise<void>;
};

export default function CreateFormInput({
  input,
  index,
  removeInput,
  moveInputDown,
  moveInputUp,
  updateInput,
}: Props) {
  const { id, required, order } = input;
  const inputTypes = Object.values(InputType);
  const lastInput = order >= index - 1;

  console.log("input", input);

  const { register, watch } = useFormContext();

  const watchedHeader = watch(`inputs.${index}.header`);
  const watchedType = watch(`inputs.${index}.type`);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (updateInput) {
        updateInput(id as string, {
          header: watchedHeader,
          type: watchedType,
        });
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [watchedHeader, watchedType, id, updateInput]);

  return (
    <div className="flex gap-2">
      <div className="w-96 flex">
        <div>
          <input
            type="text"
            {...register(`inputs.${index}.header`)}
            className="border border-black mr-4"
          />
          {required && "Required"}
        </div>

        <select
          {...register(`inputs.${index}.type`)}
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
        <button
          type="button"
          disabled={!order}
          className="btn btn-main"
          onClick={() => moveInputUp(id as string)}
        >
          ⇧
        </button>

        <button
          type="button"
          disabled={lastInput}
          className="btn btn-main"
          onClick={() => moveInputDown(id as string)}
        >
          ⇩
        </button>
      </div>

      <div>
        <RemoveInputBtn id={id as string} removeInput={removeInput} />
      </div>
    </div>
  );
}
