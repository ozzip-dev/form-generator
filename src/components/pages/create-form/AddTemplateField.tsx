"use client";

import { Input } from "@/types/input";
import { ChangeEvent, useState } from "react";

type Props = {
  inputs: Input[];
  addInput: (input: Input) => Promise<void>;
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
      <h2>Dodaj jedno z defaultowych dostępnych pól</h2>
      ddd
      <select onChange={setFieldValue}>
        <option value="">Wybierz pole</option>
        {props.inputs.map((el, i) => (
          <option value={el._id} key={i}>
            {el.header}
          </option>
        ))}
      </select>
      <button
        className="btn btn-main block mt-2"
        disabled={!input}
        onClick={() => props.addInput(input as Input)}
      >
        Dodaj jedno z pól
      </button>
    </>
  );
};

export default AddTemplateField;
