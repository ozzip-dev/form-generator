"use client";

import { useState } from "react";
import { FormSerialized } from "@/types/form";
import { Input } from "@/types/input";
import { AddInputToDraft } from "@/actions/form/AddInputToDraft";
import { RemoveInputFromDraft } from "@/actions/form/RemoveInputFromDraft";
import EditFormForm from "../pages/EditFormForm";

type Props = {
  initialForm: FormSerialized;
  templateInputs: Input[];
};

const EditForm = ({ initialForm, templateInputs }: Props) => {
  const [formData, setFormData] = useState<FormSerialized>(initialForm);

  const formId = initialForm._id as unknown as string;

  async function addInput(input: Input): Promise<void> {
    const updatedResult = await AddInputToDraft(formId, input);
    if (!updatedResult) return;

    setFormData(updatedResult);
  }

  async function removeInput(inputId: string): Promise<void> {
    const updatedResult = await RemoveInputFromDraft(formId, inputId);
    if (!updatedResult) return;

    setFormData(updatedResult);
  }

  return (
    <EditFormForm
      form={formData}
      templateInputs={templateInputs}
      addInput={addInput}
      removeInput={removeInput}
    />
  );
};

export default EditForm;
