"use client";

import { EditFormHeaderAction } from "@/actions/edit-form/EditFormHeaderAction";
import EditFormInputs from "@/components/form/EditFormInputs";
import InputFields from "@/components/inputs/InputFields";
import { SelectFieldControler } from "@/components/inputs/selectField/SelectFieldController";
import SuspenseErrorBoundary from "@/components/ui/errors/SuspenseErrorBoundary";
import FullscreenLoader from "@/components/ui/loaders/FullscreenLoader";
import { formatDateAndHour } from "@/helpers/dates/formatDateAndHour";
import { useEditForm } from "@/hooks/useEditForm";
import { editFormSchema, EditFormSchema } from "@/lib/zodSchema/editFormSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const dataSelectOptions = [
  { label: "Ankieta pracownicza", value: "text" },
  { label: "Wybory społecznego inspektora pracy", value: "inspector" },
  { label: "Referedum strajkowe", value: "strike" },
  { label: "Inne", value: "other" },
];

const dataInputsFormTitle = [
  {
    label: "Tytuł f",
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

  const { handleEdit, isLoading } = useEditForm({
    formId,
    trigger,
    action: EditFormHeaderAction,
    mode: "formHeader",
  });

  useEffect(() => {
    reset({
      title,
      description,
      inputs,
      type,
    });
  }, [inputs, title, description, type, reset]);

  const loadingForm = [...Object.values(isLoading ?? {})].some(Boolean);

  return (
    <FormProvider {...methods}>
      {loadingForm && <FullscreenLoader />}
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
              onChangeAction={(name, value) => {
                handleEdit(name, value);
              }}
            />
          </div>
          <div className="w-48">
            <InputFields
              inputsData={dataInputsFormTitle}
              register={register}
              errorMsg={errors}
              onChange={handleEdit}
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
