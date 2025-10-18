"use client";

import { Suspense, useState } from "react";
import { FormSerialized } from "@/types/form";
import { Input } from "@/types/input";
import {
  AddInputToDraft,
  MoveInputDown,
  MoveInputUp,
  RemoveInputFromDraft,
} from "@/actions/create-form";
import EditFormForm from "../pages/create-form/EditFormForm";
import DataLoading from "../ui/loaders/DataLoading";
import { GetForm } from "@/actions/create-form/GetForm";
import { useParams } from "next/navigation";
import AddFormField from "../pages/create-form/AddFormField";

type Props = {
  initialForm: FormSerialized;
  templateInputs: Input[];
};

const EditForm = ({ initialForm, templateInputs }: Props) => {
  const params = useParams();
  const formIdx = params?.formId;

  console.log("initialForm", initialForm);

  const [formData, setFormData] = useState<FormSerialized>(initialForm);

  const formId = initialForm._id as unknown as string;

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
    <>
      <Suspense fallback={<DataLoading />}>
        <EditFormForm
          form={initialForm}
          templateInputs={templateInputs}
          moveInputDown={moveInputDown}
          moveInputUp={moveInputUp}
        />
      </Suspense>
      <AddFormField />
    </>
  );
};

export default EditForm;
