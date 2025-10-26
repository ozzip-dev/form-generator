"use client";

import { AddFormFieldAction } from "@/actions/create-form";
import InputError from "@/components/inputs/InputError";
import InputFields from "@/components/inputs/InputFields";
import Select from "@/components/inputs/Select";
import { SelectControler } from "@/components/inputs/SelectController";
import ButtonSubmit from "@/components/ui/buttons/ButtonSubmit";
import { InputType } from "@/enums";
import { handleClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import IconPlus from "@/icons/iconPlus/IconPlus";
import {
  addFormFieldSchema,
  AddFormFieldSchema,
} from "@/lib/zodShema/addFormFieldShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useErrorBoundary } from "react-error-boundary";
import { Controller, useForm } from "react-hook-form";

const dataSelectOptions = [
  { label: "Odpowiedź krótka", value: "text" },
  { label: "Ddpowiedź długa", value: "superText" },
  { label: "Email", value: "email" },
  { label: "Data", value: "date" },
  { label: "Numer", value: "number" },
  { label: "Wybór pojedynczy", value: "singleSelect" },
  { label: "Wybór wielokrotny", value: "checkbox" },
];

const dataInputsheader = [
  {
    name: "header",
    placeholder: "Nazwa pola",
    type: "text",
  },
];

const AddFormField = () => {
  const inputTypes = Object.values(InputType);
  const { formId } = useParams();

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddFormFieldSchema>({
    resolver: zodResolver(addFormFieldSchema),
  });
  const { showBoundary } = useErrorBoundary();

  const onSubmit = async (data: AddFormFieldSchema) => {
    try {
      const resp = await AddFormFieldAction(formId as string, {
        ...data,
        type: data.type as InputType,
        validation: {},
      });

      if (resp?.error) {
        handleClientErrors<AddFormFieldSchema>(resp.error, setError);
        return;
      }

      reset();
    } catch (err) {
      showBoundary(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex mb-6 px-4">
      <div className="flex mb-6">
        <InputFields
          inputsData={dataInputsheader}
          register={register}
          errorMsg={errors}
        />

        <div className="w-48">
          <SelectControler
            name="type"
            control={control}
            placeholder="Wybierz"
            defaultValue="text"
            options={dataSelectOptions}
          />

          {/* <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                defaultValue="text"
                options={[
                  { label: "Odpowiedź krótka", value: "text" },
                  { label: "Ddpowiedź długa", value: "superText" },
                  { label: "Email", value: "email" },
                  { label: "Data", value: "date" },
                  { label: "Numer", value: "number" },
                  { label: "Wybór pojedynczy", value: "singleSelect" },
                  { label: "Wybór wielokrotny", value: "checkbox" },
                ]}
              />
            )}
          /> */}
        </div>

        <div className="w-fit">
          <ButtonSubmit
            isSubmitting={isSubmitting}
            icon={<IconPlus style="h-7 w-7 bg-white" />}
          />
        </div>
      </div>
    </form>
  );
};

export default AddFormField;
