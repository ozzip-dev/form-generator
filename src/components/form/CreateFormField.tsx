"use client";

import { FormInput } from "@/types/input";

function CreateFormField(props: FormInput) {
  const { description, type, header, required } = props;
  return (
    <>
      <div className="w-96 h-28 border border-black p-2">
        <div>
          <b>{header}</b> {""} ({type})
        </div>
        <div>{description}</div>
        {required && "Required"}
      </div>
    </>
  );
}

export default CreateFormField;
