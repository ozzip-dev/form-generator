"use client";

import { EditInputLabelAction } from "@/actions/edit-form/EditInputLabelAction";
import { EditInputTypeAction } from "@/actions/edit-form/EditInputTypeAction";
import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { FormInput } from "@/types/input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import InputFields from "../inputs/InputFields";
import RequiredToggleSwitch from "../inputs/RequiredToggleSwitch";
import { SelectFieldControler } from "../inputs/selectField/SelectFieldController";
import FullscreenLoader from "../ui/loaders/FullscreenLoader";
import EditFormDescriptionInput from "./EditFormDescriptionInput";
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
  const [isDescriptionInput, setDescriptionInput] = useState(false);
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
  } = useFormContext();

  const { handleEdit: handleEditLabel, isLoading: isLoadingLabel } =
    useEditForm({
      formId,
      inputId,
      trigger,
      action: EditInputLabelAction,
      mode: "inputLabel",
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

  const dataInputLabel = [
    {
      type: "text",
      name: `inputs.${props.inputIdx}.header`,
      placeholder: "Nazwa pola",
    },
  ];
  const dataInputDescription = [
    {
      type: "text",
      name: `inputs.${props.inputIdx}.description`,
      placeholder: "Nazwa pola",
    },
  ];

  return (
    <div className="flex gap-2 items-center p-2 bg-slate-200">
      {isAnyLoading && <FullscreenLoader />}
      <div className="w-96 flex">
        <div className="mr-4">
          <InputFields
            inputsData={dataInputLabel}
            register={register}
            errorMsg={(errors.inputs as any)?.[props.inputIdx]?.header}
            onChange={handleEditLabel}
          />

          <EditFormDescriptionInput
            inputId={inputId as string}
            inputIdx={props.inputIdx}
            description={description ?? ""}
          />
          {/* {description || isDescriptionInput ? (
            <div className="flex gap-2">
              <InputFields
                inputsData={dataInputDescription}
                register={register}
                errorMsg={(errors.inputs as any)?.[props.inputIdx]?.description}
                onChange={handleEditLabel}
              />
              <button
                type="button"
                onClick={() => {
                  setDescriptionInput((prev) => !prev);

                  if (!description) return;
                  EditInputLabelAction(formId as string, inputId as string, {
                    description: "",
                  });
                }}
              >
                X
              </button>
            </div>
          ) : (
            <button type="button" onClick={handleDescriptionInput}>
              Dodaj opis pola
            </button>
          )} */}

          {required && "Required"}
        </div>

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
      <RequiredToggleSwitch input={props.input} />

      <div className="flex flex-col justify-center gap-2">
        {order > 0 && <MoveInputUpBtn inputId={inputId as string} />}
        {!isLastInput && <MoveInputDownBtn inputId={inputId as string} />}
      </div>

      <div>
        <RemoveInputBtn inputId={inputId as string} />
      </div>
    </div>
  );
}
