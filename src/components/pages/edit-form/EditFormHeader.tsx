"use client";

import { editFormHeaderAction } from "@/actions/edit-form/editFormHeaderAction";
import { FullscreenLoader, InputFields } from "@/components/shared";
import { SelectFieldControler } from "@/components/shared/inputs/selectField/SelectFieldController";
import { useEditForm } from "@/hooks/useEditForm";
import {
  editFormSchema,
  EditFormSchema,
} from "@/lib/zodSchema/editFormSchemas/editFormSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import FormStateData from "./editFormUrl/FormStateData";

const dataSelectOptions = [
  { label: "Ankieta pracownicza", value: "text" },
  { label: "Wybory społecznego inspektora pracy", value: "inspector" },
  { label: "Referedum strajkowe", value: "strike" },
  { label: "Inne", value: "other" },
];

const dataInputsFormTitle = [
  {
    label: "Edytuj tytuł formularza",
    name: "title",
    placeholder: "Tytuł formularza",
    type: "text",
  },
  {
    label: "Edytuj opis formularza",
    name: "description",
    placeholder: "Edytuj opis formularza",
    type: "text",
  },
];

type Props = {
  form: FormSerialized;
};

export default function EditFormHeader(props: Props) {
  const { _id: formId, title, description, type } = props.form;

  const methods = useForm<EditFormSchema>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title,
      description,
      type,
    },
    mode: "all",
  });

  const {
    register,
    formState: { errors },
    trigger,
    setError,
  } = methods;

  const { handleEdit, isLoading } = useEditForm({
    formId,
    trigger,
    action: editFormHeaderAction,
    mode: "formHeader",
    setError,
  });

  const loadingForm = [...Object.values(isLoading ?? {})].some(Boolean);

  return (
    <>
      {loadingForm && <FullscreenLoader />}

      {formId && <FormStateData form={props.form} />}

      <div className="p-4">
        <FormProvider {...methods}>
          <form className="mt-4 space-y-2">
            <div className="w-80 mb-10">
              <SelectFieldControler
                name={`type`}
                defaultValue=""
                label="Wybierz kategorię formularza"
                placeholder="Wybierz kategorię formularza"
                options={dataSelectOptions}
                onChangeAction={(name, value) => {
                  handleEdit(name, value);
                }}
              />
            </div>
            <div className="w-80">
              <InputFields
                inputsData={dataInputsFormTitle}
                register={register}
                errorMsg={errors}
                onChange={handleEdit}
                isLoading={isLoading}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
