"use client";

import { findOne } from "@/lib/mongo";
import { formatDate } from "@/lib/utils";
import { Form } from "@/types/form";
import { FormInput } from "@/types/input";

type Props = { form: Form };

const EditForm = (props: Props) => {
  const { title, description, inputs, createdAt, updatedAt } = props.form;
  return (
    <div className="p-4">
      <div>Utworzono: {formatDate(new Date(createdAt))}</div>
      <div>Edytowano: {formatDate(new Date(updatedAt))}</div>
      <div className="text-5xl">{title}</div>
      <div className="text-3xl">{description}</div>
      <div>
        ({inputs.map((el: FormInput, i: number) => el.header).join(", ")})
      </div>
    </div>
  );
};

export default EditForm;
