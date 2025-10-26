"use client";

import { ToggleRequired } from "@/actions/input";
import { FormInput } from "@/types/input";
import { useParams } from "next/navigation";

interface Props {
  input: FormInput;
}

export default function RequiredToggleSwitch(props: Props) {
  const { formId } = useParams();

  const handleToggle = async () => {
    await ToggleRequired(formId as string, props.input.id!);
  };

  return (
    <div className="flex gap-2 items-center">
      <div>Required</div>
      <input
        type="checkbox"
        checked={props.input.required}
        onChange={handleToggle}
      />
    </div>
  );
}
