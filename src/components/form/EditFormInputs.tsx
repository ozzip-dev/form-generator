"use client";

// import { handleEditFormDraft } from "@/components/pages/create-form/handleIEditFormDraft";
import { InputType } from "@/enums";
import { FormInput } from "@/types/input";
import { useFormContext } from "react-hook-form";
import InputFields from "../inputs/InputFields";
import RequiredToggleSwitch from "../inputs/RequiredToggleSwitch";
import MoveInputDownBtn from "./MoveInputDownBtn";
import MoveInputUpBtn from "./MoveInputUpBtn";
import RemoveInputBtn from "./RemoveInputBtn";
import { useParams } from "next/navigation";
import { useEditFormDraft } from "@/hooks/useEditFormDraft";

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
  const { formId } = useParams();
  const { handleEditFormDraft, savingFields } = useEditFormDraft(
    formId as string
  );
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const dataInputField = [
    {
      type: "text",
      name: `inputs.${props.index}.header`,
      placeholder: "Nazwa pola",
    },
  ];

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
