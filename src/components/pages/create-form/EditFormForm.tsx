"use client";

import EditFormInputs from "@/components/form/EditFormInputs";
import FormTypeSelect from "@/components/form/FormTypeSelect";
import InputFields from "@/components/inputs/InputFields";
import { SelectFieldControler } from "@/components/inputs/selectField/SelectFieldController";
import SuspenseErrorBoundary from "@/components/ui/errors/SuspenseErrorBoundary";
import { formatDateAndHour } from "@/helpers/dates/formatDateAndHour";
import { useEditFormDraft } from "@/hooks/useEditFormDraft";
import { editFormSchema, EditFormSchema } from "@/lib/zodSchema/editFormSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { az } from "zod/v4/locales";

const dataSelectOptions = [
  // { label: "Ankieta pracownicza", value: "text" },
  { label: "Wybory społecznego inspektora pracy", value: "inspector" },
  { label: "Referedum strajkowe", value: "strike" },
  { label: "Inne", value: "other" },
];

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

  const {
    register,
    reset,
    formState: { errors },
    trigger,
    control,
  } = methods;

  const { handleEditFormDraft, isLoading } = useEditFormDraft(formId, trigger);

  useEffect(() => {
    reset({
      title,
      description,
      inputs,
      type,
    });
  }, [inputs, title, description, type, reset]);

  const handle = (value: any) => {
    console.log("", value);
  };

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
          <div className="w-80">
            <SelectFieldControler
              name={`type`}
              control={control}
              defaultValue=""
              placeholder="Wybierz kategorię formularza"
              options={dataSelectOptions}
              onChangeAction={(value) => {
                handle(value);
              }}
            />
          </div>
          <div className="w-48">
            <InputFields
              inputsData={dataInputsTitle}
              register={register}
              errorMsg={errors}
              onChange={handleEditFormDraft}
              isLoading={isLoading}
            />
          </div>

          <div className="my-6 flex flex-col gap-4">
            <div className="w-48"></div>
            {inputs
              .sort((a, b) => a.order - b.order)
              .map((el, idx) => {
                return (
                  <SuspenseErrorBoundary
                    key={el.id}
                    size="sm"
                    errorMessage="Błąd przesyłu danych formularza"
                  >
                    <EditFormInputs
                      key={el.id}
                      input={el}
                      inputIdx={idx}
                      inputsLength={inputs.length}
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
