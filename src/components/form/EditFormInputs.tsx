"use client";

import { EditInputLabelAction } from "@/actions/edit-form/editInput/EditInputLabelAction";
import { EditInputTypeAction } from "@/actions/edit-form/editInput/EditInputTypeAction";
import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FormInput } from "@/types/input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SelectFieldControler } from "../shared/inputs/selectField/SelectFieldController";
import EditFormDescriptionInput from "./EditFormDescriptionInput";
import MoveInputDownBtn from "./MoveInputDownBtn";
import MoveInputUpBtn from "./MoveInputUpBtn";
import RemoveInputBtn from "./RemoveInputBtn";
import AddOption from "./AddOption";
import { FullscreenLoader, InputFields, RequiredToggleSwitch } from "../shared";

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
  const dataInputLabel = [
    {
      type: "text",
      name: `inputs.${props.inputIdx}.header`,
      placeholder: "Pytanie",
      label: "Edytuj pytanie",
    },
  ];

  const {
    id: inputId,
    required,
    order,
    type,
    header,
    description,
  } = props.input;
  const isLastInput = props.inputIdx === props.inputsLength - 1;
  const formId = useSafeURLParam("formId");

  const {
    register,
    formState: { errors },
    trigger,
    control,
    setError,
  } = useFormContext();

  // console.log("props.input", props.input);

  const { handleEdit: handleEditLabel, isLoading: isLoadingLabel } =
    useEditForm({
      formId,
      inputId,
      inputIdx: props.inputIdx,
      trigger,
      action: EditInputLabelAction,
      mode: "inputLabel",
      setError,
    });

  const { handleEdit: handleEditType, isLoading: isLoadingType } = useEditForm({
    formId,
    inputId,
    trigger,
    action: EditInputTypeAction,
    mode: "inputType",
  });

  const isAnyLoading = [
    ...Object.values(isLoadingLabel ?? {}),
    ...Object.values(isLoadingType ?? {}),
  ].some(Boolean);

  return (
    <div className="flex gap-2 items-center p-2 bg-slate-200">
      {isAnyLoading && <FullscreenLoader />}
      <div className="w-3/5 flex">
        <div className="flex flex-col gap-2 mr-4 w-3/5">
          <InputFields
            inputsData={dataInputLabel}
            register={register}
            errorMsg={(errors.inputs as any)?.[props.inputIdx]?.header}
            onChange={handleEditLabel}
            isLoading={isLoadingLabel}
          />

          <EditFormDescriptionInput
            inputId={inputId as string}
            inputIdx={props.inputIdx}
            description={description ?? ""}
          />
          {(type === "checkbox" || type === "singleSelect") && (
            <AddOption
              inputIdx={props.inputIdx}
              inputId={inputId as string}
              header={header}
            />
          )}
        </div>

        <div className="w-1/2 flex justify-center">
          <SelectFieldControler
            name={`inputs.${props.inputIdx}.type`}
            control={control}
            defaultValue={type}
            options={dataSelectOptions}
            onChangeAction={(name, value) => {
              handleEditType(name, value);
            }}
          />
        </div>
      </div>

      <RequiredToggleSwitch input={props.input} />

      <div className="flex flex-col justify-center gap-2 mb-auto">
        <div className="">
          {order > 0 && <MoveInputUpBtn inputId={inputId as string} />}
          {!isLastInput && <MoveInputDownBtn inputId={inputId as string} />}
        </div>
      </div>

      <div className="mb-auto">
        <RemoveInputBtn inputId={inputId as string} />
      </div>
    </div>
  );
}
