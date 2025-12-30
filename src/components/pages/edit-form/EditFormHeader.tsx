"use client";

import { editFormHeaderAction } from "@/actions/edit-form/editFormHeaderAction";
import { InputFields } from "@/components/shared";
import { SelectFieldControler } from "@/components/shared/inputs/selectField/SelectFieldController";
import { FormResultVisibility, FormType } from "@/enums/form";
import { formTypesWithLabels, formVisibilityData } from "@/helpers/formHelpers";
import { useEditForm } from "@/hooks/useEditForm";
import {
  editFormHeaderSchema,
  EditFormHeaderSchema,
} from "@/lib/zodSchema/editFormSchemas/editFormHeaderSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const dataSelectOptions: { label: string; value: FormType | "" }[] = [
  { label: "-- wybierz --", value: "" },
  ...formTypesWithLabels,
];

const resultVisibilityOptions: {
  label: string;
  value: FormResultVisibility | "";
}[] = [{ label: "-- wybierz --", value: "" }, ...formVisibilityData];

const dataInputsFormTitle = [
  {
    label: "Edytuj tytuł formularza",
    name: "title",
    placeholder: "Tytuł formularza",
    type: "text",
  },
];

const dataInputsFormDescription = [
  {
    label: "Edytuj opis formularza",
    name: "description",
    placeholder: "Edytuj opis formularza",
    type: "textarea",
  },
];

type Props = {
  form: FormSerialized;
};

export default function EditFormHeader(props: Props) {
  const {
    _id: formId,
    title,
    description,
    type,
    resultVisibility,
  } = props.form;

  const methods = useForm<EditFormHeaderSchema>({
    resolver: zodResolver(editFormHeaderSchema),
    defaultValues: {
      title,
      description,
      type,
      resultVisibility,
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
      {/* {loadingForm && <FullscreenLoader />} */}

      <div className="p-4">
        <FormProvider {...methods}>
          <form className="mt-4 space-y-2 rounded-md shadow-default  border border-default bg-bg_light">
            <div className="w-80 !mb-10">
              <SelectFieldControler
                name="type"
                defaultValue=""
                label="Wybierz kategorię formularza"
                placeholder="Wybierz kategorię formularza"
                options={dataSelectOptions}
                onChangeAction={(name, value) => {
                  handleEdit(name, value);
                }}
              />
            </div>

            <div className="w-80 !mb-10">
              <SelectFieldControler
                name="resultVisibility"
                defaultValue=""
                label="Wybierz typ głosowania"
                placeholder="Wybierz typ głosowania"
                options={resultVisibilityOptions}
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
                // isLoading={isLoading}
              />

              <InputFields
                inputsData={dataInputsFormDescription}
                register={register}
                errorMsg={errors}
                onChange={handleEdit}
                // isLoading={isLoading}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
