"use client";

import { SelectFieldControler } from "@/components/shared/inputs/selectField/SelectFieldController";
import { useEditForm } from "@/hooks/useEditForm";
import { editFormSchema, EditFormSchema } from "@/lib/zodSchema/editFormSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormStateData from "./FormStateData";
import CreatedUpdatedInfo from "./CreatedUpdatedInfo";
import {
  FullscreenLoader,
  SuspenseErrorBoundary,
  InputFields,
} from "@/components/shared";
import { editFormHeaderAction } from "@/actions/edit-form/editInput/editFormHeaderActionXX";
import EditFormInputs from "./EditFormInputs";

const dataSelectOptions = [
  { label: "Ankieta pracownicza", value: "text" },
  { label: "Wybory społecznego inspektora pracy", value: "inspector" },
  { label: "Referedum strajkowe", value: "strike" },
  { label: "Inne", value: "other" },
];

const dataInputsFormTitle = [
  {
    label: "Edytuj tytuł formularza",
    name: "title",
    placeholder: "Tytuł formularza",
    type: "text",
  },
  {
    label: "Edytuj opis formularza",
    name: "description",
    placeholder: "Edytuj opis formularza",
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

  const inputsWithObjectOptions = inputs.map((input) => ({
    ...input,
    options: input.options?.map((option: string) => ({ value: option })) || [],
  }));
  // console.log("props.form", props.form);
  const methods = useForm<EditFormSchema>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title,
      description,
      type,
      inputs: inputsWithObjectOptions,
    },

    mode: "all",
  });

  const {
    register,
    reset,
    formState: { errors },
    trigger,
    control,
    setError,
    watch,
  } = methods;

  useEffect(() => {
    const subscription = watch((values) => {
      console.log("Aktualne wartości:", values);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const values = watch();
    console.log("val", values);
  }, [props.form]);

  const { handleEdit, isLoading } = useEditForm({
    formId,
    trigger,
    action: editFormHeaderAction,
    mode: "formHeader",
    setError,
  });

  useEffect(() => {
    reset({
      title,
      description,
      inputs: inputsWithObjectOptions,
      type,
    });
  }, [inputs, title, description, type, reset]);

  const loadingForm = [...Object.values(isLoading ?? {})].some(Boolean);

  return (
    <>
      {loadingForm && <FullscreenLoader />}

      {formId && <FormStateData form={props.form} />}

      <div className="p-4">
        <CreatedUpdatedInfo createdAt={createdAt} updatedAt={updatedAt} />

        <FormProvider {...methods}>
          <form className="mt-4 space-y-2">
            <div className="w-80 mb-10">
              <SelectFieldControler
                name={`type`}
                control={control}
                defaultValue=""
                label="Wybierz kategorię formularza"
                placeholder="Wybierz kategorię formularza"
                options={dataSelectOptions}
                onChangeAction={(name, value) => {
                  handleEdit(name, value);
                }}
              />
            </div>
            <div className="w-80">
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
        </FormProvider>
      </div>
    </>
  );
}
