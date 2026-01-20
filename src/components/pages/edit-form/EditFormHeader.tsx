"use client";

import { editFormHeaderAction } from "@/actions/edit-form/editFormHeaderAction";
import { InfoIcon, InputFields } from "@/components/shared";
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
    <FormProvider {...methods}>
      <form className="flex flex-col gap-16">
        <Card className="flex flex-col pr-12">
          <div className="sm:flex gap-8 lg:gap-24 mb-4">
            <div className="sm:w-[20rem] md:w-[31rem]">
              <SelectFieldControler
                name="type"
                defaultValue=""
                label="Kategoria"
                options={dataSelectOptions}
                onChangeAction={handleEdit}
              />
            </div>

            <div className="flex gap-2 items-end sm:w-[20rem] md:w-[31rem] relative">
              <SelectFieldControler
                name="resultVisibility"
                defaultValue=""
                label="Tryb wyników"
                options={resultVisibilityOptions}
                onChangeAction={handleEdit}
              />
              <div className="absolute left-full ml-2">
                <InfoIcon>
                  <>
                    <div>
                      <span className="font-black">Jawne: </span>
                      <span>
                        Wyniki w formie podsumowania odpowiedzi i odpowiedzi z
                        każdego pojedynczego formularza
                      </span>
                    </div>
                    <div className="pt-4">
                      <span className="font-black">Tajne: </span>
                      <span>Wyniki w formie podsumowania odpowiedzi</span>
                    </div>
                  </>
                </InfoIcon>
              </div>
            </div>
          </div>

          <div className="">
            <CheckboxSwitch
              label="Wyświetl email autora/autorki"
              name="displayAuthorEmail"
              control={control}
              onChangeAction={handleSwitch}
            />
          </div>
        </Card>

        <Card>
          <div className="mb-8">
            <FormHeaderImageUpload {...props} />
          </div>

          <InputFields
            inputsData={dataInputsFormTitle}
            register={register}
            errorMsg={errors}
            onChange={handleEdit}
          />
        </Card>
      </form>
    </FormProvider>
  );
}
