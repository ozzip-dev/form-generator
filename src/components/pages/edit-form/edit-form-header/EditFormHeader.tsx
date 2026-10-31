"use client";

import { editFormHeaderAction } from "@/actions/edit-form/editFormHeaderAction";
import { toggleDisplayAuthorEmailAction } from "@/actions/edit-form/toggleDisplayAuthorEmailAction";
import {
  Card,
  Icon,
  InfoIcon,
  InputFields,
  SelectFieldController,
  CheckboxSwitch,
} from "@/components/shared";
import { useFormData } from "@/context/FormDataContextProvider";
import { useAutoLoader, useLoader } from "@/context/LoaderContextProvider";
import {
  useAddFieldPublishError,
  useHeaderPublishError,
} from "@/context/PublishFormErrorContextProvider";
import { FormResultVisibility, FormType } from "@/enums/form";
import { formTypesWithLabels, formVisibilityData } from "@/helpers/formHelpers";
import { useEditForm } from "@/hooks/useEditForm";
import {
  editFormHeaderSchema,
  EditFormHeaderSchema,
} from "@/lib/zod-schema/edit-form-schemas/editFormHeaderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, use, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AddTextEditorBtn from "../AddTextEditorBtn";
import FormHeaderImageUpload from "../FormHeaderImageUpload";
import EditHeaderDescription from "./EditHeaderDescription";
import { InputType } from "@/enums";

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
    floatingLabel: "tytuł formularza",
    name: "title",
    placeholder: "Tytuł formularza",
    type: InputType.TEXT,
  },
];

type Props = {
  headerFileData?: any;
};

export default function EditFormHeader(props: Props) {
  const { formDataPromise } = useFormData();
  const form = use(formDataPromise);
  const { error: headerPublishError } = useHeaderPublishError();
  const { error: addFieldPublishError } = useAddFieldPublishError();
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

  const hasAnyError = Object.values(headerPublishError?.headerError ?? {}).some(
    (value) => value !== "",
  );

  return (
    <FormProvider {...methods}>
      <form className="mt-8" id="header">
        <div className="mb-8 ml-8 text-lg font-extrabold">Nagłówek</div>
        <Card className="bg-white">
          <FormHeaderImageUpload
            formId={formId}
            headerFileData={props.headerFileData}
          />
          <div className="flex items-center">
            <div className="w-full">
              <InputFields
                inputsData={dataInputsFormTitle}
                register={register}
                errorMsg={errors}
                onChange={handleEdit}
              />
              {headerPublishError?.headerError?.title && (
                <Icon
                  icon="exclamation"
                  size={23}
                  className="absolute right-8 top-1/2 -translate-y-1/2 bg-error text-error"
                />
              )}
              {/* {!showDescription && (
                <div className="absolute -right-10 top-1/2 -translate-y-1/2">
                  <AddTextEditorBtn action={() => setShowDescription(true)} />
                </div>
              )} */}
            </div>
          </div>

          <EditHeaderDescription onClose={() => setShowDescription(false)} />
        </Card>
      </form>
    </FormProvider>
  );
}
