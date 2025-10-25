"use client";

import { FormInput } from "@/types/input";
import RemoveInputBtn from "./RemoveInputBtn";
import MoveInputUpBtn from "./MoveInputUpBtn";
import MoveInputDownBtn from "./MoveInputDownBtn";
import RequiredToggleSwitch from "../inputs/RequiredToggleSwitch";
import EditFormInputTexts from "./EditFormInputTexts";
import EditFormInputType from "./EditFormInputType";

type Props = {
  input: FormInput;
  index: number;
  formId: string;
  totalInputs: number;
};

export default function EditFormInput(props: Props) {
  const { id, order } = props.input;
  const isLastInput = props.index === props.totalInputs - 1;

  return (
    <div className="flex gap-2 items-center p-2 bg-slate-200">
      <div className="w-[29rem] flex gap-2">
        <EditFormInputTexts
          formId={props.formId}
          input={props.input}
          index={props.index}
        />

        <EditFormInputType
          formId={props.formId}
          input={props.input}
          index={props.index}
        />
      </div>

      <div className="flex flex-col justify-center gap-2">
        {order > 0 && <MoveInputUpBtn inputId={id as string} />}

        {!isLastInput && <MoveInputDownBtn inputId={id as string} />}
      </div>

      <RequiredToggleSwitch formId={props.formId} input={props.input} />

      <div>
        <RemoveInputBtn id={id as string} />
      </div>
    </div>
  );
}
