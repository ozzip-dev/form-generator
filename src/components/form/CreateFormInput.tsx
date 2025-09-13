"use client";

import { FormInput } from "@/types/input";
import RemoveInputBtn from "./RemoveInputBtn";

type Props = {
  input: FormInput;
  removeInput: (id: string) => Promise<void>;
};

function CreateFormInput(props: Props) {
  const { id, description, type, header, required } = props.input;
  return (
    <div className="flex gap-2">
      <div className="w-96 h-28 border border-black p-2">
        <div>
          <b>{header}</b> {""} ({type})
        </div>
        <div>{description}</div>
        {required && "Required"}
      </div>
      <div>
        <RemoveInputBtn id={id as string} removeInput={props.removeInput} />
      </div>
    </div>
  );
}

export default CreateFormInput;
