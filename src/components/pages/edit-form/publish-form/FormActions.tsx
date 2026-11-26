"use client";
import { editFormHeaderAction } from "@/actions/edit-form/editFormHeaderAction";

import { useUser } from "@/context/UserContextProvider";
import { isUserAuthor } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";
import { UserSerialized } from "@/types/user";
import RemoveFormButton from "../RemoveFormButton";
import AliasUrlForm from "./AliasUrlForm";
import PublishFormButton from "./PublishFormButton";
import {
  Card,
  CheckboxSwitch,
  Icon,
  InfoIcon,
  SelectFieldController,
} from "@/components/shared";
import CreatedUpdatedInfo from "../CreatedUpdatedInfo";
import { FormProvider, useForm } from "react-hook-form";
import { FormResultVisibility, FormType } from "@/enums/form";
import { formTypesWithLabels, formVisibilityData } from "@/helpers/formHelpers";
import { startTransition, use, useState } from "react";
import {
  editFormHeaderSchema,
  EditFormHeaderSchema,
} from "@/lib/zod-schema/edit-form-schemas/editFormHeaderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormData } from "@/context/FormDataContextProvider";
import { useEditForm } from "@/hooks/useEditForm";
import { toggleDisplayAuthorEmailAction } from "@/actions/edit-form/toggleDisplayAuthorEmailAction";
import {
  useAddFieldPublishError,
  useHeaderPublishError,
} from "@/context/PublishFormErrorContextProvider";
import { useAutoLoader, useLoader } from "@/context/LoaderContextProvider";

const dataSelectOptions: { label: string; value: FormType | "" }[] = [
  { label: "Wybierz", value: "" },
  ...formTypesWithLabels,
];

const resultVisibilityOptions: {
  label: string;
  value: FormResultVisibility | "";
}[] = [{ label: "Wybierz", value: "" }, ...formVisibilityData];

type Props = {
  formStructure: FormSerialized;
};

const IconError = () => {
  return (
    <Icon
      icon="exclamation"
      size={23}
      className="absolute right-10 top-[3.5rem] bg-error text-error"
    />
  );
};

const FormActions = ({ formStructure }: Props) => {
  const { _id, url, createdAt, updatedAt } = formStructure;
  const { formDataPromise } = useFormData();
  const form = use(formDataPromise);
  const formUrl: string = `/${url || _id}`;
  const { setLoading } = useLoader();
  const { userPromise } = useUser();
  const user: UserSerialized | null = use(userPromise);
  const isAuthor = user && isUserAuthor(formStructure, user._id);
  const { error: addFieldPublishError } = useAddFieldPublishError();
  const { error: headerPublishError } = useHeaderPublishError();

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
    <div className="py-8">
      <Card className="mb-8 bg-white">
        <h3 className="mb-8 text-lg">Ustawienia</h3>
        <div className="flex flex-col gap-16">
          <PublishFormButton form={formStructure} />
          {(!!addFieldPublishError || hasAnyError) && (
            <Card className="w-full text-sm text-error">
              <p className="mb-2">Błąd publikacji</p>
              <div className="text-xs">
                {headerPublishError.headerError?.type && (
                  <p>- {headerPublishError.headerError?.type}</p>
                )}
                {headerPublishError.headerError?.resultVisibility && (
                  <p>- {headerPublishError.headerError?.resultVisibility}</p>
                )}
                {headerPublishError.headerError?.title && (
                  <p>- {headerPublishError.headerError?.title}</p>
                )}
                {headerPublishError.missingHeadersError && (
                  <p>- {headerPublishError.missingHeadersError}</p>
                )}
                {addFieldPublishError && <p>- {addFieldPublishError}</p>}
              </div>
            </Card>
          )}
          <AliasUrlForm {...formStructure} />
          <FormProvider {...methods}>
            <form>
              <div className="grid">
                <div className="relative w-full">
                  <SelectFieldController
                    name="type"
                    defaultValue=""
                    label="Kategoria formularza"
                    options={dataSelectOptions}
                    onChangeAction={handleEdit}
                  />
                  {headerPublishError?.headerError?.type && <IconError />}
                </div>

                <div className="relative flex flex-1 items-center">
                  <div className="relative w-full">
                    <SelectFieldController
                      name="resultVisibility"
                      defaultValue=""
                      label="Tryb wyników"
                      options={resultVisibilityOptions}
                      onChangeAction={handleEdit}
                    />
                    {headerPublishError?.headerError?.resultVisibility && (
                      <IconError />
                    )}
                  </div>

                  <InfoIcon>
                    <div className="relative z-40">
                      <div>
                        <span className="font-semibold">Jawny: </span>
                        <span>
                          odpowiedzi z każdego formularza oraz zbiorcze
                          podsumowanie odpowiedzi.
                        </span>
                      </div>
                      <div className="pt-4">
                        <span className="font-semibold">Tajny: </span>
                        <span>
                          {" "}
                          zbiorcze podsumowanie odpowiedzi bez powiązania ich z
                          pojedynczymi formularzami.
                        </span>
                      </div>
                    </div>
                  </InfoIcon>
                </div>
              </div>

              <div className="w-fit text-sm">
                <CheckboxSwitch
                  label="E-mail kontaktowy"
                  name="displayAuthorEmail"
                  control={control}
                  onChangeAction={handleSwitch}
                />
              </div>
            </form>
          </FormProvider>

          <CreatedUpdatedInfo createdAt={createdAt} updatedAt={updatedAt} />
        </div>
      </Card>
      {isAuthor && _id && <RemoveFormButton formId={_id} />}
    </div>
  );
};

export default FormActions;
