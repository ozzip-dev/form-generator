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
    label: "Tytuł formularza",
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

  const isSelectLoading =
    isLoading?.type === true || isLoading?.resultVisibility === true;
  useAutoLoader(isSelectLoading);

  const isTextLoading =
    isLoading?.description === true || isLoading?.title === true;
  useAutoLoader(isTextLoading, "small");

  return (
    <FormProvider {...methods}>
      <form className="mt-8 [&_input]:text-xl [&_input]:font-bold" id="header">
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
            </div>
          </div>

          <EditHeaderDescription onClose={() => setShowDescription(false)} />
        </Card>
      </form>
    </FormProvider>
  );
}
