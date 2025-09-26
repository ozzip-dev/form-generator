"use client";

import { formatDate } from "@/lib/utils";
import { FormSerialized } from "@/types/form";
import { FormInput, Input } from "@/types/input";
import CreateFormInput from "../form/CreateFormInput";
import AddTemplateField from "./create-form/AddTemplateField";
import AddCustomField from "./create-form/AddCustomField";

type Props = {
  form: FormSerialized;
  templateInputs: Input[];
  addInput: (input: Input) => Promise<void>;
  removeInput: (id: string) => Promise<void>;
  moveInputDown: (id: string) => Promise<void>;
  moveInputUp: (id: string) => Promise<void>;
};

// stupid name but it's a form to edit forms:)
const EditFormForm = (props: Props) => {
  const { title, description, inputs, createdAt, updatedAt } = props.form;

  return (
    <div className="p-4 [&_h2]:text-xl [&_h2]:mt-6">
      <div>Utworzono: {formatDate(new Date(createdAt))}</div>
      <div>Edytowano: {formatDate(new Date(updatedAt))}</div>
      <div className="text-5xl">{title}</div>
      <div className="text-3xl">{description}</div>
      <div className="my-6 flex flex-col gap-4">
        {inputs
          .sort((a, b) => a.order - b.order)
          .map((el: FormInput, i: number) => (
            <CreateFormInput
              inputs={inputs}
              input={el}
              removeInput={props.removeInput}
              moveInputDown={props.moveInputDown}
              moveInputUp={props.moveInputUp}
              key={i}
            />
          ))}
      </div>

      {/* TODO: these two need a separate wrapper but let's wait for design etc. */}
      <AddTemplateField
        inputs={props.templateInputs}
        addInput={props.addInput}
        />

      <AddCustomField
        addInput={props.addInput}
      />
    </div>
  );
};

export default EditFormForm;
