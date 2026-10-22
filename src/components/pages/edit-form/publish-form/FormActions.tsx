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
import { useLoader } from "@/context/LoaderContextProvider";
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
    <div>
      <Card className="my-8">
        <h3 className="text-lg">Ustawienia</h3>
        <CreatedUpdatedInfo createdAt={createdAt} updatedAt={updatedAt} />
        <PublishFormButton form={formStructure} />

        <AliasUrlForm {...formStructure} />
        <div className="mb-2 flex gap-2">
          <div>Adres:</div>
          <div>{formUrl}</div>
        </div>

        <FormProvider {...methods}>
          <form>
            {(!!addFieldPublishError || hasAnyError) && (
              <Card className="text-sm text-error lg:flex">
                <p className="mb-2 mr-2 text-center">
                  Błąd przy publikacji formularza:{" "}
                </p>
                <div className="text-center">
                  {[
                    headerPublishError.headerError?.type,
                    headerPublishError.headerError?.resultVisibility,
                    headerPublishError.headerError?.title,
                    headerPublishError.missingHeadersError,
                    addFieldPublishError,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </div>
              </Card>
            )}

            <div className="grid gap-8">
              <div className="relative mr-[3rem] flex-1 lg:mr-0">
                <SelectFieldController
                  name="type"
                  defaultValue=""
                  label="Kategoria formularza"
                  options={dataSelectOptions}
                  onChangeAction={handleEdit}
                />
                {headerPublishError?.headerError?.type && (
                  <Icon
                    icon="exclamation"
                    size={23}
                    className="absolute right-8 top-[1.5rem] -translate-y-1/2 bg-error text-error sm:top-1/2"
                  />
                )}
              </div>

              <div className="relative flex flex-1 items-center">
                <div className="w-full">
                  <SelectFieldController
                    name="resultVisibility"
                    defaultValue=""
                    label="Tryb wyników"
                    options={resultVisibilityOptions}
                    onChangeAction={handleEdit}
                  />
                  {headerPublishError?.headerError?.resultVisibility && (
                    <Icon
                      icon="exclamation"
                      size={23}
                      className="absolute right-20 top-1/2 -translate-y-1/2 bg-error text-error"
                    />
                  )}
                </div>

                <InfoIcon>
                  <>
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
                  </>
                </InfoIcon>
              </div>
            </div>

            <div className="w-fit text-sm">
              <CheckboxSwitch
                label="Wyświetl email autora/autorki"
                name="displayAuthorEmail"
                control={control}
                onChangeAction={handleSwitch}
              />
            </div>
          </form>
        </FormProvider>
      </Card>
      {isAuthor && _id && <RemoveFormButton formId={_id} />}
    </div>
  );
};

export default FormActions;
