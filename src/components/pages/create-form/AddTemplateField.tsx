"use client";

import { Input } from "@/types/input";
import { ChangeEvent, useState } from "react";

type Props = {
  formId: string;
  inputs: Input[];
  addField: (input: Input) => Promise<void>;
};

// TODO: change to <form>
const AddTemplateField = (props: Props) => {
  const [input, setInput] = useState<Input | null>(null);

  const setFieldValue = (e: ChangeEvent<HTMLSelectElement>): void => {
    const inputId = e.target.value;
    const selectedInput: Input = props.inputs.find(
      ({ _id }) => _id === inputId
    ) as Input;
    setInput(selectedInput);
  };

  return (
    <>
      <select onChange={setFieldValue}>
        <option value="">Dodaj pole</option>
        {props.inputs.map((el, i) => (
          <option value={el._id} key={i}>
            {el.header}
          </option>
        ))}
      </select>

      <button disabled={!input} onClick={() => props.addField(input as Input)}>
        Dodaj
      </button>
    </>
  );
};

export default AddTemplateField;
