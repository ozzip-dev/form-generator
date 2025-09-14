"use client";

import { FormInput } from "@/types/input";
import RemoveInputBtn from "./RemoveInputBtn";

type Props = {
  inputs: FormInput[];
  input: FormInput;
  removeInput: (id: string) => Promise<void>;
  moveInputDown: (id: string) => Promise<void>;
  moveInputUp: (id: string) => Promise<void>;
};

function CreateFormInput(props: Props) {
  const { id, description, type, header, required, order } = props.input;
  const lastInput = order >= props.inputs.length - 1;

  return (
    <div className="flex gap-2">
      <div className="w-96 h-28 border border-black p-2">
        <div>
          <b>{header}</b> {""} ({type})
        </div>
        <div>{description}</div>
        {required && "Required"}
      </div>
      <div className="flex flex-col justify-center gap-2">
        <button
          disabled={!order}
          className="btn btn-main"
          onClick={() => {
            props.moveInputUp(id as string);
          }}
        >
          ⇧
        </button>

        <button
          disabled={lastInput}
          className="btn btn-main"
          onClick={() => {
            props.moveInputDown(id as string);
          }}
        >
          ⇩
        </button>
      </div>
      <div>
        <RemoveInputBtn id={id as string} removeInput={props.removeInput} />
      </div>
    </div>
  );
}

export default CreateFormInput;
