"use client";

import { InputType } from "@/enums";
import { useEditFormDraft } from "@/hooks/useEditFormDraft";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FormInput } from "@/types/input";
import { useFormContext } from "react-hook-form";
import InputFields from "../inputs/InputFields";
import RequiredToggleSwitch from "../inputs/RequiredToggleSwitch";
import MoveInputDownBtn from "./MoveInputDownBtn";
import MoveInputUpBtn from "./MoveInputUpBtn";
import RemoveInputBtn from "./RemoveInputBtn";
import { SelectFieldControler } from "../inputs/selectField/SelectFieldController";

const dataSelectOptions = [
  { label: "Odpowiedź krótka", value: "text" },
  { label: "Ddpowiedź długa", value: "superText" },
  { label: "Email", value: "email" },
  { label: "Data", value: "date" },
  { label: "Numer", value: "number" },
  { label: "Wybór pojedynczy", value: "singleSelect" },
  { label: "Wybór wielokrotny", value: "checkbox" },
];

type Props = {
  input: FormInput;
  inputIdx: number;
  inputsLength: number;
};

export default function EditFormInputs(props: Props) {
  const { id, required, order, type, header } = props.input;
  const inputTypes = Object.values(InputType);
  const isLastInput = props.inputIdx === props.inputsLength - 1;
  const formId = useSafeURLParam("formId");

  const {
    register,
    formState: { errors },
    trigger,
    control,
  } = useFormContext();
  const { handleEditFormDraft, isLoading } = useEditFormDraft(formId, trigger);

  const dataInputField = [
    {
      type: "text",
      name: `inputs.${props.inputIdx}.header`,
      placeholder: "Nazwa pola",
    },
  ];

  return (
    <>
      {" "}
      <div className="flex gap-2 items-center p-2 bg-slate-200">
        <div className="w-96 flex">
          <div className="mr-4">
            <InputFields
              inputsData={dataInputField}
              register={register}
              errorMsg={(errors.inputs as any)?.[props.inputIdx]?.header}
              onChange={handleEditFormDraft}
              isLoading={isLoading}
            />
            {required && "Required"}
          </div>

          <SelectFieldControler
            name={`inputs.${props.inputIdx}.type`}
            control={control}
            placeholder="Wybierz"
            defaultValue="text"
            options={dataSelectOptions}
          />
        </div>

        <div className="flex flex-col justify-center gap-2">
          <MoveInputUpBtn inputId={id as string} removeBtn={order} />
          <MoveInputDownBtn inputId={id as string} isLast={isLastInput} />
        </div>

        <RequiredToggleSwitch input={props.input} />

        <div>
          <RemoveInputBtn inputId={id as string} />
        </div>
      </div>
      <div>
        {header} {type}
      </div>
    </>
  );
}
