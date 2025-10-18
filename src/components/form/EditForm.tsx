"use client";

import { FormSerialized } from "@/types/form";
import { Input } from "@/types/input";
import { Suspense } from "react";
import AddFormField from "../pages/create-form/AddFormField";
import EditFormForm from "../pages/create-form/EditFormForm";
import DataLoading from "../ui/loaders/DataLoading";

type Props = {
  initialForm: FormSerialized;
  templateInputs: Input[];
};

const EditForm = ({ initialForm, templateInputs }: Props) => {
  return (
    <>
      <Suspense fallback={<DataLoading />}>
        <EditFormForm form={initialForm} templateInputs={templateInputs} />
      </Suspense>
      <AddFormField />
    </>
  );
};

export default EditForm;
