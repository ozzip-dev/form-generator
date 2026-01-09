"use client";

import { editFormHeaderAction } from "@/actions/edit-form/editFormHeaderAction";
import { InputFields } from "@/components/shared";
import Card from "@/components/shared/Card";
import { SelectFieldControler } from "@/components/shared/inputs/selectField/SelectFieldController";
import { useAutoLoader } from "@/context/LoaderContextProvider";
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
  { label: "Wybierz", value: "" },
  ...formTypesWithLabels,
];

const resultVisibilityOptions: {
  label: string;
  value: FormResultVisibility | "";
}[] = [{ label: "Wybierz", value: "" }, ...formVisibilityData];

const dataInputsFormTitle = [
  {
    floatingLabel: "Edytuj tytuł formularza",
    name: "title",
    placeholder: "Tytuł formularza",
    type: "text",
  },
  {
    floatingLabel: "Edytuj opis formularza",
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

  const isSelectLoading =
    isLoading?.type === true || isLoading?.resultVisibility === true;
  useAutoLoader(isSelectLoading);

  const isTextLoading =
    isLoading?.description === true || isLoading?.title === true;
  useAutoLoader(isTextLoading, "small");

  return (
    <Card>
      <FormProvider {...methods}>
        <form>
          <div className="sm:w-[30rem] md:w-[50rem]">
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

          <div className="sm:w-[30rem] md:w-[50rem]">
            <SelectFieldControler
              name="resultVisibility"
              defaultValue=""
              label="Widoczność wyników"
              placeholder="Wybierz typ głosowania"
              options={resultVisibilityOptions}
              onChangeAction={(name, value) => {
                handleEdit(name, value);
              }}
            />
          </div>

          <InputFields
            inputsData={dataInputsFormTitle}
            register={register}
            errorMsg={errors}
            onChange={handleEdit}
            // isLoading={isLoading}
          />
        </form>
      </FormProvider>
    </Card>
  );
}
