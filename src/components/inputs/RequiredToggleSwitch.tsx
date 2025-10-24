"use client";

import { ToggleRequired } from "@/actions/input";
import { FormInput } from "@/types/input";

interface Props {
  formId: string;
  input: FormInput;
}

export default function RequiredToggleSwitch({ formId, input }: Props) {
  const handleToggle = async () => {
    await ToggleRequired(formId, input.id!);
  };

  return (
    <div className="flex gap-2 items-center">
      <div>Required</div>
      <input type="checkbox" checked={input.required} onChange={handleToggle} />
    </div>
  );
}
