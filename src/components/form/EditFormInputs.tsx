"use client";

import { useFormContext } from "react-hook-form";
import { FormInput } from "@/types/input";
import { InputType } from "@/enums";
import RemoveInputBtn from "./RemoveInputBtn";
import { useEffect } from "react";
import MoveInputUpBtn from "./MoveInputUpBtn";
import MoveInputDownBtn from "./MoveInputDownBtn";
import RequiredToggleSwitch from "../inputs/RequiredToggleSwitch";
import { EditFormAction } from "@/actions/create-form/EditFormAction";
import InputFields from "../inputs/InputFields";
import { handleEditFormDraft } from "@/components/pages/create-form/handleIEditFormDraft";

type Props = {
  input: FormInput;
  index: number;
  formId: string;
  totalInputs: number;
};

export default function EditFormInputs(props: Props) {
  const { id, required, order, type } = props.input;
  const inputTypes = Object.values(InputType);
  const isLastInput = props.index === props.totalInputs - 1;

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  // console.log("", props.input);

  const dataInputField = [
    {
      type: "text",
      name: `inputs.${props.index}.header`,
      placeholder: "Nazwa pola",
    },
  ];

  console.log("komp", errors.inputs);

  const watchedHeader = watch(`inputs.${props.index}.header`);
  const watchedType = watch(`inputs.${props.index}.type`);

  return (
    <div className="flex gap-2 items-center p-2 bg-slate-200">
      <div className="w-96 flex">
        <div>
          <InputFields
            inputsData={dataInputField}
            register={register}
            errorMsg={(errors.inputs as any)?.[props.index]?.header}
            onChange={handleEditFormDraft}
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
