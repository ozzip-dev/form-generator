"use client";

import { editFormHeaderAction } from "@/actions/edit-form/editFormHeaderAction";
import { Button, Icon, InfoIcon, InputFields } from "@/components/shared";
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
import FormHeaderImageUpload from "../FormHeaderImageUpload";
import CheckboxSwitch from "@/components/shared/inputs/checkboxField/CheckboxSwitch";
import { startTransition, use, useState } from "react";
import { toggleDisplayAuthorEmailAction } from "@/actions/edit-form/toggleDisplayAuthorEmailAction";
import { useFormData } from "@/context/FormDataContextProvider";
import { useHeaderPublishError } from "@/context/PublishFormErrorContextProvider";
import { serializeForm } from "@/lib/serialize-utils";
import TextEditor from "../textEditor/TextEditor";
import EditFormDescriptionInput from "../editFormInput/EditFormDescriptionEditor";
import EditHeaderDescription from "./EditHeaderDescription";
import AddTextEditorBtn from "../AddTextEditorBtn";

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
];

type Props = {
  headerFileData?: any;
};

export default function EditFormHeader(props: Props) {


  const { formDataPromise } = useFormData();
  const form = use(formDataPromise);
  const { error: headerPublishError } = useHeaderPublishError();
  const [showDescription, setShowDescription] = useState(!!form?.description);



  const methods = useForm<EditFormHeaderSchema>({
    resolver: zodResolver(editFormHeaderSchema),
    defaultValues: {
      title: form?.title ?? "",
      type: form?.type ?? "",
      resultVisibility: form?.resultVisibility ?? "",
      displayAuthorEmail: form?.displayAuthorEmail ?? false,
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

  const formId = form?._id;
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

  console.log('', headerPublishError)



  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-6">
        {/* {!!headerPublishError && (
          <div className="text-error w-fit m-auto">
            <p className="">Błąd przy publikacji formularza</p>
            <p className="text-sm text-center">{headerPublishError}</p>
          </div>
        )} */}
        <Card>
          <div className="sm:flex lg:gap-[15%]">
            <div className="flex-1 mr-[3rem] lg:mr-0 relative">
              <SelectFieldControler
                name="type"
                defaultValue=""
                label="Kategoria formularza"
                options={dataSelectOptions}
                onChangeAction={handleEdit}
              />

              <p className="text-2xs text-error absolute bottom-0 left-2 bg-bg_light z-10 w-full">
                {headerPublishError?.headerError?.type}</p>
            </div>

            <div className=" flex-1 flex items-center relative">
              <div className="w-full">
                <SelectFieldControler
                  name="resultVisibility"
                  defaultValue=""
                  label="Tryb wyników"
                  options={resultVisibilityOptions}
                  onChangeAction={handleEdit}
                />
                <p className="text-2xs text-error absolute bottom-0 left-2 bg-bg_light z-10 w-full">
                  {headerPublishError?.headerError?.resultVisibility}</p>
              </div>


              <InfoIcon>
                <>
                  <div>
                    <span className="font-black">Jawny: </span>
                    <span>
                      Podsumowanie wszystkich odpowiedzi oraz odpowiedzi z
                      każdego pojedynczego formularza
                    </span>
                  </div>
                  <div className="pt-4">
                    <span className="font-black">Tajny: </span>
                    <span>Podsumowanie wszystkich odpowiedzi</span>
                  </div>
                </>
              </InfoIcon>

            </div>
          </div>

          <div className="text-sm">
            <CheckboxSwitch
              label="Wyświetl email autora/autorki"
              name="displayAuthorEmail"
              control={control}
              onChangeAction={handleSwitch}
            />
          </div>
        </Card>

        <FormHeaderImageUpload formId={formId} headerFileData={props.headerFileData} />


        <Card>
          <div className="flex items-center">
            <div className="w-full relative">
              <InputFields
                inputsData={dataInputsFormTitle}
                register={register}
                errorMsg={errors}
                onChange={handleEdit}
              />
              <p className="text-2xs bg-bg_light absolute bottom-0 left-2 text-error z-10">
                {headerPublishError?.headerError?.title}</p>
            </div>

            <div className="w-fit h-fit ml-1">

              {showDescription ? (
                <div className="w-[2rem] h-1" />
              ) : (
                <div className="w-fit h-fit ml-1">
                  <AddTextEditorBtn action={() => setShowDescription(true)} />
                </div>
              )}


            </div>
          </div>


          {showDescription && (
            <EditHeaderDescription
              onClose={() => setShowDescription(false)}
            />
          )}

        </Card>
      </form>
    </FormProvider>
  );
}
