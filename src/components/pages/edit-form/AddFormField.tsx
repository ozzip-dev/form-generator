"use client";

import { SelectFieldControler } from "@/components/shared/inputs/selectField/SelectFieldController";
import { Button, FullscreenLoader, InputFields } from "@/components/shared";
import { InputType } from "@/enums";
import { setClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import IconPlus from "@/icons/iconPlus/IconPlus";
import {
  addFormFieldSchema,
  AddFormFieldSchema,
} from "@/lib/zodSchema/editFormSchemas/addFormFieldSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useErrorBoundary } from "react-error-boundary";
import { FormProvider, useForm } from "react-hook-form";
import { addFormFieldAction } from "@/actions/edit-form/addFormFieldAction";

const dataSelectOptions = [
  { label: "Odpowiedź krótka", value: "text" },
  { label: "Odpowiedź długa", value: "superText" },
  { label: "Email", value: "email" },
  { label: "Data", value: "date" },
  { label: "Numer", value: "number" },
  { label: "Wybór pojedynczy", value: "singleSelect" },
  { label: "Wybór wielokrotny", value: "checkbox" },
];

const dataInputsheader = [
  {
    name: "header",
    placeholder: "Pytanie",
    type: "text",
    label: "Podaj pytanie",
  },
];

const AddFormField = () => {
  const { formId } = useParams();

  const methods = useForm<AddFormFieldSchema>({
    resolver: zodResolver(addFormFieldSchema),
    defaultValues: {
      type: "text",
    },
    mode: "all",
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  const { showBoundary } = useErrorBoundary();

  const onSubmit = async (data: AddFormFieldSchema) => {
    try {
      const resp = await addFormFieldAction(formId as string, {
        ...data,
        type: data.type as InputType,
        validation: {},
        options: [],
      });

      if (resp?.validationErrors) {
        setClientErrors(resp.validationErrors, setError);
        return;
      }
      reset();
    } catch (err) {
      showBoundary(err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex mb-6 px-4">
        {isSubmitting && <FullscreenLoader />}
        <div className="flex mb-6">
          <InputFields
            inputsData={dataInputsheader}
            register={register}
            errorMsg={errors}
          />

          <div className="w-48 flex justify-center">
            <SelectFieldControler
              name="type"
              defaultValue="text"
              options={dataSelectOptions}
            />
          </div>

          <div className="w-fit">
            <Button icon={<IconPlus style="h-7 w-7 bg-white" />} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddFormField;
