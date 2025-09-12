"use client";

import { findOne } from "@/lib/mongo";
import { formatDate } from "@/lib/utils";
import { Form } from "@/types/form";
import { FormInput } from "@/types/input";
import CreateFormField from "../form/CreateFormField";

type Props = { form: Form };

// TODO Pawel: why rendered twice?
const EditForm = (props: Props) => {
  const { title, description, inputs, createdAt, updatedAt } = props.form;
  return (
    <div className="p-4">
      <div>Utworzono: {formatDate(new Date(createdAt))}</div>
      <div>Edytowano: {formatDate(new Date(updatedAt))}</div>
      <div className="text-5xl">{title}</div>
      <div className="text-3xl">{description}</div>
      <div className="mt-6 flex flex-col gap-4">
        {inputs
          .sort((a, b) => a.order - b.order)
          .map((el: FormInput, i: number) => (
            <CreateFormField {...el} key={i} />
          ))}
      </div>
    </div>
  );
};

export default EditForm;
