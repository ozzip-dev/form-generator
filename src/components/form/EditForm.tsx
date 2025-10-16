"use client";

import { useState } from "react";
import { FormSerialized } from "@/types/form";
import { Input } from "@/types/input";
import {
  AddInputToDraft,
  MoveInputDown,
  MoveInputUp,
  RemoveInputFromDraft,
} from "@/actions/create-form";
import EditFormForm from "../pages/create-form/EditFormForm";

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

  async function moveInputUp(inputId: string): Promise<void> {
    const updatedResult = await MoveInputUp(formId, inputId);
    if (!updatedResult) return;

    setFormData(updatedResult);
  }

  async function moveInputDown(inputId: string): Promise<void> {
    const updatedResult = await MoveInputDown(formId, inputId);
    if (!updatedResult) return;

    setFormData(updatedResult);
  }

  return (
    <EditFormForm
      form={formData}
      templateInputs={templateInputs}
      addInput={addInput}
      removeInput={removeInput}
      moveInputDown={moveInputDown}
      moveInputUp={moveInputUp}
    />
  );
};

export default EditForm;
