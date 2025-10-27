"use client";

import { EditInputsTextAction } from "@/actions/input";
import { InputType } from "@/enums";
import { useEditFormDraftXX } from "@/hooks/useEditFormDraftXX";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FormInput } from "@/types/input";
import { useFormContext } from "react-hook-form";
import InputFields from "../inputs/InputFields";
import RequiredToggleSwitch from "../inputs/RequiredToggleSwitch";
import { SelectFieldControler } from "../inputs/selectField/SelectFieldController";
import MoveInputDownBtn from "./MoveInputDownBtn";
import MoveInputUpBtn from "./MoveInputUpBtn";
import RemoveInputBtn from "./RemoveInputBtn";

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
  const { id: inputId, required, order, type, header } = props.input;
  const inputTypes = Object.values(InputType);
  const isLastInput = props.inputIdx === props.inputsLength - 1;
  const formId = useSafeURLParam("formId");
  const {
    register,
    formState: { errors },
    trigger,
    control,
  } = useFormContext();

  console.log("", props.input);

  const { handleEdit, isLoading } = useEditFormDraftXX({
    formId,
    inputId,
    trigger,
    action: EditInputsTextAction,
    mode: "input",
  });

  const dataInputField = [
    {
      type: "text",
      name: `inputs.${props.inputIdx}.header`,
      placeholder: "Nazwa pola",
    },
  ];
  const dataInputFieldx = [
    {
      type: "text",
      name: `inputs.${props.inputIdx}.description`,
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
              onChange={handleEdit}
              isLoading={isLoading}
            />
            <InputFields
              inputsData={dataInputFieldx}
              register={register}
              errorMsg={(errors.inputs as any)?.[props.inputIdx]?.description}
              onChange={handleEdit}
              isLoading={isLoading}
            />

            {required && "Required"}
          </div>

          <SelectFieldControler
            name={`inputs.${props.inputIdx}.type`}
            control={control}
            // defaultValue={type}
            options={dataSelectOptions}
            onChangeAction={(name, value) => {
              handleEdit(name, value);
            }}
          />
        </div>

        <div className="flex flex-col justify-center gap-2">
          {order > 0 && <MoveInputUpBtn inputId={inputId as string} />}
          {!isLastInput && <MoveInputDownBtn inputId={inputId as string} />}
        </div>

        <RequiredToggleSwitch input={props.input} />

        <div>
          <RemoveInputBtn inputId={inputId as string} />
        </div>
      </div>
    </>
  );
}
