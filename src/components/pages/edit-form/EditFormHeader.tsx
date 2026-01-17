"use client";

import { editFormHeaderAction } from "@/actions/edit-form/editFormHeaderAction";
import { Icon, InputFields } from "@/components/shared";
import Card from "@/components/shared/Card";
import { SelectFieldControler } from "@/components/shared/inputs/selectField/SelectFieldController";
import { useAutoLoader, useLoader } from "@/context/LoaderContextProvider";
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
import FormHeaderImageUpload from "./FormHeaderImageUpload";
import CheckboxSwitch from "@/components/shared/inputs/CheckboxSwitch";
import { startTransition } from "react";
import { toggleDisplayAuthorEmailAction } from "@/actions/edit-form/toggleDisplayAuthorEmailAction";

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
  headerFileData?: any;
};

export default function EditFormHeader(props: Props) {
  const {
    _id: formId,
    title,
    description,
    type,
    resultVisibility,
    displayAuthorEmail,
  } = props.form;

  const methods = useForm<EditFormHeaderSchema>({
    resolver: zodResolver(editFormHeaderSchema),
    defaultValues: {
      title,
      description,
      type,
      resultVisibility,
      displayAuthorEmail,
    },
    mode: "all",
  });

  const {
    control,
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

  const { setLoading } = useLoader();

  const isSelectLoading =
    isLoading?.type === true || isLoading?.resultVisibility === true;
  useAutoLoader(isSelectLoading);

  const isTextLoading =
    isLoading?.description === true || isLoading?.title === true;
  useAutoLoader(isTextLoading, "small");

  const handleSwitch = () => {
    setLoading("fullscreen", true);
    startTransition(async () => {
      if (!formId) return;
      await toggleDisplayAuthorEmailAction(formId);
      setLoading("fullscreen", false);
    });
  };

  return (
    <Card>
      <FormProvider {...methods}>
        <form>
          <div className="sm:w-[30rem] md:w-[50rem]">
            <SelectFieldControler
              name="type"
              defaultValue=""
              label="Kategoria formularza"
              placeholder="Wybierz kategorię formularza"
              options={dataSelectOptions}
              onChangeAction={(name, value) => {
                handleEdit(name, value);
              }}
            />
          </div>

          <div className="sm:w-[30rem] md:w-[50rem] flex items-center relative">
            <SelectFieldControler
              name="resultVisibility"
              defaultValue=""
              label="Tryb dostępności wyników"
              placeholder="Wybierz typ głosowania"
              options={resultVisibilityOptions}
              onChangeAction={(name, value) => {
                handleEdit(name, value);
              }}
            />
            {/* <div className="absolute">
              {resultVisibility === "secret" && (
                <div
                  className=" p-2 
                    w-[20rem] text-2xs z-10"
                >
                  Wyniki w formie podsumowania odpowiedzi
                </div>
              )}
              {resultVisibility === "open" && (
                <div
                  className=" p-2 
               w-[20rem] text-2xs z-10"
                >
                  Wyniki w formie podsumowania odpowiedzi i odpowiedzi z każdego
                  pojedynczego formularza
                </div>
              )}
            </div> */}
          </div>

          <div className="pb-16">
            <CheckboxSwitch
              label="Wyświetl email autora/autorki"
              name="displayAuthorEmail"
              control={control}
              onChangeAction={handleSwitch}
            />
          </div>

          <InputFields
            inputsData={dataInputsFormTitle}
            register={register}
            errorMsg={errors}
            onChange={handleEdit}
            // isLoading={isLoading}
          />

          <FormHeaderImageUpload {...props} />
        </form>
      </FormProvider>
    </Card>
  );
}
