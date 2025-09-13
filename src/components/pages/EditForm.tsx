"use client";

import { formatDate } from "@/lib/utils";
import { Form } from "@/types/form";
import { FormInput, Input } from "@/types/input";
import CreateFormField from "../form/CreateFormField";
import AddTemplateField from "./create-form/AddTemplateField";

type Props = {
  form: Form;
  templateInputs: Input[];
  addField: (input: Input) => Promise<void>;
};

// TODO: why rendered twice?
// TODO: add live rerender
const EditForm = (props: Props) => {
  const { _id, title, description, inputs, createdAt, updatedAt } = props.form;
  return (
    <div className="p-4">
      <div>Utworzono: {formatDate(new Date(createdAt))}</div>
      <div>Edytowano: {formatDate(new Date(updatedAt))}</div>
      <div className="text-5xl">{title}</div>
      <div className="text-3xl">{description}</div>
      <div className="my-6 flex flex-col gap-4">
        {inputs
          .sort((a, b) => a.order - b.order)
          .map((el: FormInput, i: number) => (
            <CreateFormField {...el} key={i} />
          ))}
      </div>

      <AddTemplateField
        formId={_id as string}
        inputs={props.templateInputs}
        addField={props.addField}
      />
    </div>
  );
};

export default EditForm;
