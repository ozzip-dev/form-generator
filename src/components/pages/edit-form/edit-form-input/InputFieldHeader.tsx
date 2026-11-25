"use client";

import { InputType } from "@/enums";
import { dataSelectOptions } from "../editFormData";
import FormInputMoveRemoveButtons from "./FormInputMoveRemoveButtons";
import { SelectFieldController } from "@/components/shared";
import { useTransition } from "react";
import { editInputTypeAction } from "@/actions/edit-form/edit-form-input/editInputTypeAction";

type Props = {
  inputNumber: number | null;
  type: InputType;
  formId: string;
  inputId: string;
};

const InputFieldHeader = ({ inputNumber, type, formId, inputId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleEditType = (type: InputType) => {
    startTransition(async () => {
      if (!formId || !inputId) return;
      await editInputTypeAction(formId, inputId, type);
    });
  };

  return (
    <div className="relative mb-8 flex flex-col sm:flex-row-reverse sm:items-center sm:gap-8">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white sm:hidden">
          {inputNumber}
        </div>
        <FormInputMoveRemoveButtons />
      </div>

      <div className="my-4 sm:my-0 sm:w-[22rem] [&_[id='type-error']]:hidden">
        <SelectFieldController
          name="type"
          defaultValue={type}
          options={dataSelectOptions}
          onChangeAction={(name, value) => {
            handleEditType(value as InputType);
          }}
        />
      </div>
      <div className="mr-auto hidden h-12 w-12 items-center justify-center rounded-full bg-accent text-white sm:flex">
        {inputNumber}
      </div>
    </div>
  );
};

export default InputFieldHeader;
