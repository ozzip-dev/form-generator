"use client";

import EditFormInputs from "@/components/form/EditFormInputs";
import FormTypeSelect from "@/components/form/FormTypeSelect";
import InputFields from "@/components/inputs/InputFields";
// import { handleEditFormDraft } from "@/components/pages/create-form/handleIEditFormDraft";
import SuspenseErrorBoundary from "@/components/ui/errors/SuspenseErrorBoundary";
import { formatDateAndHour } from "@/helpers/dates/formatDateAndHour";
import { editFormSchema, EditFormSchema } from "@/lib/zodShema/editFormSchema";
import { FormSerialized } from "@/types/form";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DataLoader from "@/components/ui/loaders/DataLoader";
import { useEditFormDraft } from "@/hooks/useEditFormDraft";

const dataInputsTitle = [
  {
    label: "Tytuł",
    name: "title",
    placeholder: "Tytuł formularza",
    type: "text",
  },
  {
    label: "Opis",
    name: "description",
    placeholder: "Opis formularza",
    type: "text",
  },
];

type Props = {
  form: FormSerialized;
};

export default function EditFormForm(props: Props) {
  const {
    _id: formId,
    createdAt,
    updatedAt,
    title,
    description,
    inputs,
    type,
  } = props.form;

  const methods = useForm<EditFormSchema>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title,
      description,
      type,
      inputs,
    },
    mode: "all",
  });
  const { handleEditFormDraft, savingFields } = useEditFormDraft(formId);

  const {
    register,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    reset({
      title,
      description,
      inputs,
      type,
    });
  }, [inputs, title, description, type, reset]);

  return (
    <FormProvider {...methods}>
      <div className="p-4">
        <div className="flex justify-between">
          <div className="text-xs text-gray-400 mt-1">
            Edytowano: {formatDateAndHour(updatedAt)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Utworzono: {formatDateAndHour(createdAt)}
          </div>
        </div>

        <form className="mt-4 space-y-2">
          <FormTypeSelect register={register} />

          <div className="w-48">
            <InputFields
              inputsData={dataInputsTitle}
              register={register}
              errorMsg={errors}
              onChange={handleEditFormDraft}
            />
          </div>

          <div className="my-6 flex flex-col gap-4">
            <div className="w-48"></div>
            {inputs
              .sort((a, b) => a.order - b.order)
              .map((el, index) => {
                return (
                  <SuspenseErrorBoundary
                    key={el.id}
                    size="sm"
                    errorMessage="Błąd przesyłu danych formularza"
                  >
                    <EditFormInputs
                      key={el.id}
                      input={el}
                      index={index}
                      formId={formId!}
                      totalInputs={inputs.length}
                    />
                  </SuspenseErrorBoundary>
                );
              })}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
