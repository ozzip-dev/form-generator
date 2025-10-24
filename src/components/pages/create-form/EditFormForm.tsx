"use client";

import { EditFormAction } from "@/actions/create-form/EditFormAction";
import EditFormInputs from "@/components/form/EditFormInputs";
import FormTypeSelect from "@/components/form/FormTypeSelect";
import InputFields from "@/components/inputs/InputFields";
import { formatDateAndHour } from "@/helpers/dates/formatDateAndHour";
import { FormType } from "@/enums/form";
import { FormSerialized } from "@/types/form";
import { FormInput } from "@/types/input";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

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
  const created = formatDateAndHour(createdAt);
  const updated = formatDateAndHour(updatedAt);

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

  const handleUpdateInput = async (id: string, data: Partial<FormInput>) => {
    // if (props.updateInput) {
    //   await props.updateInput(id, data);
    // }
    console.log("update input", id, data);
  };

  useEffect(() => {
    reset({
      title,
      description,
      inputs,
      type,
    });
  }, [inputs, title, description, type, reset]);

  const { _id } = props.form;

  useEffect(() => {
    if (!watched.type) return;
    const timeout = setTimeout(async () => {
      await EditFormAction(_id!, {
        title: watched.title,
        description: watched.description,
        type: watched.type as FormType,
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [watched.title, watched.description, watched.type, _id]);

  useEffect(() => {
    setValue("title", title);
    setValue("description", description);
    setValue("type", type);
  }, [title, description, type, setValue]);

  return (
    <FormProvider {...methods}>
      <div className="p-4">
        <div className="flex justify-between">
          <div className="text-xs text-gray-400 mt-1">Utworzono: {created}</div>
          <div className="text-xs text-gray-400 mt-1">Edytowano: {updated}</div>
        </div>

        <form className="mt-4 space-y-2">
          <FormTypeSelect register={register} />

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
                <EditFormInputs
                  key={el.id}
                  input={el}
                  index={index}
                  formId={formId!}
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
