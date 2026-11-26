"use client";

import { editFormHeaderAction } from "@/actions/edit-form/editFormHeaderAction";
import { Card, Icon, InputFields } from "@/components/shared";
import { useFormData } from "@/context/FormDataContextProvider";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import {
  useAddFieldPublishError,
  useHeaderPublishError,
} from "@/context/PublishFormErrorContextProvider";
import { InputType } from "@/enums";
import { FormResultVisibility, FormType } from "@/enums/form";
import { formTypesWithLabels, formVisibilityData } from "@/helpers/formHelpers";
import { useEditForm } from "@/hooks/useEditForm";
import {
  editFormHeaderSchema,
  EditFormHeaderSchema,
} from "@/lib/zod-schema/edit-form-schemas/editFormHeaderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormHeaderImageUpload from "../FormHeaderImageUpload";
import HeaderEditor from "./HeaderEditor";

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
    placeholder: "Tytuł",
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
      <form className="mt-8 [&_input]:text-xl" id="header">
        <Card className="bg-white">
          <FormHeaderImageUpload
            formId={formId}
            headerFileData={props.headerFileData}
          />
          <div className="flex items-center">
            <div className="relative w-full">
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
                  className="absolute right-4 top-[4.5rem] bg-error text-error"
                />
              )}
            </div>
          </div>

          <HeaderEditor />
        </Card>
      </form>
    </FormProvider>
  );
}
