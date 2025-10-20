"use client";

import CreateFormInput from "@/components/form/CreateFormInput";
import InputFields from "@/components/inputs/InputFields";
import Select from "@/components/inputs/Select";
import { formatDateAndHour } from "@/helpers/dates/formatDateAndHour";
import { FormSerialized } from "@/types/form";
import { FormInput, Input } from "@/types/input";
import { useEffect } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";

const dataInputsTitle = [
  {
    label: "Tytuł",
    name: "title",
    placeholder: "Tytuł formulaża",
    type: "text",
  },
  {
    label: "Opis",
    name: "description",
    placeholder: "Opis formulaża",
    type: "text",
  },
];

type Props = {
  form: FormSerialized;
  templateInputs: Input[];
  updateInput?: (id: string, data: Partial<FormInput>) => Promise<void>;
  updateForm?: (data: {
    title?: string;
    description?: string;
  }) => Promise<void>;
};

export default function EditFormForm(props: Props) {
  const { createdAt, updatedAt, title, description, inputs } = props.form;
  const created = formatDateAndHour(createdAt);
  const updated = formatDateAndHour(updatedAt);

  // console.log("", inputs);

  const methods = useForm();

  const {
    watch,
    control,
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = methods;
  const watched = watch();

  // console.log("sss", watched);

  useEffect(() => {
    reset({
      title,
      description,
      inputs,
    });
  }, [inputs, title, description, reset]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (props.updateForm) {
        props.updateForm({
          title: watched.title,
          description: watched.description,
        });
      }
    }, 600);
    return () => clearTimeout(timeout);
  }, [watched.title, watched.description, props.updateForm]);

  useEffect(() => {
    setValue("title", title);
    setValue("description", description);
  }, [title, description, setValue]);

  const handleUpdateInput = async (id: string, data: Partial<FormInput>) => {
    if (props.updateInput) {
      await props.updateInput(id, data);
    }
  };

  // console.log("xxx", inputs);

  return (
    <FormProvider {...methods}>
      <div className="w-48">
        <Controller
          name="type"
          control={control}
          rules={{ required: "Wybór jest wymagany" }}
          render={({ field, fieldState }) => (
            <Select
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              errorMsg={fieldState.error?.message}
              placeholder="Wybierz"
              options={[
                { label: "Krótka odpowiedź", value: "text" },
                { label: "Długa odpowiedź", value: "superText" },
                { label: "Email", value: "email" },
                { label: "Data", value: "date" },
                { label: "Numer", value: "number" },
                { label: "Wybierz kilka", value: "checkbox" },
                { label: "Wybierz jeden", value: "singleSelect" },
              ]}
            />
          )}
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between">
          <div className="text-xs text-gray-400 mt-1">Utworzono: {created}</div>
          <div className="text-xs text-gray-400 mt-1">Edytowano: {updated}</div>
        </div>

        <form className="mt-4 space-y-2">
          <div className="w-48">
            <InputFields
              inputsData={dataInputsTitle}
              register={register}
              errorMsg={errors}
            />
          </div>

          <div className="my-6 flex flex-col gap-4">
            <div className="w-48"></div>
            {inputs
              .sort((a, b) => a.order - b.order)
              .map((el, index) => (
                <CreateFormInput
                  key={el.id}
                  input={el}
                  index={index}
                  totalInputs={inputs.length}
                  updateInput={handleUpdateInput}
                />
              ))}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
