"use client";

import { SelectFieldControler } from "@/components/shared/inputs/selectField/SelectFieldController";
import { Button, FullscreenLoader, InputFields } from "@/components/shared";
import { InputType } from "@/enums";
import { setClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import {
  addFormFieldSchema,
  AddFormFieldSchema,
} from "@/lib/zodSchema/editFormSchemas/addFormFieldSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useErrorBoundary } from "react-error-boundary";
import { FormProvider, useForm } from "react-hook-form";
import { addFormFieldAction } from "@/actions/edit-form/addFormFieldAction";
import { dataSelectOptions } from "./editFormData";
import Icon from "@/components/shared/icons/Icon";

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between items-center mb-10 px-32"
      >
        {isSubmitting && <FullscreenLoader />}

        <div className="flex justify-between w-2/3">
          <div className=" w-3/6">
            <InputFields
              inputsData={dataInputsheader}
              register={register}
              errorMsg={errors}
            />
          </div>

          <div className="w-2/6">
            <SelectFieldControler
              name="type"
              defaultValue="text"
              options={dataSelectOptions}
            />
          </div>

          <div className="w-fit">
            <Button
              icon={
                <Icon icon="plus-solid-full" className="h-7 w-7 bg-white" />
              }
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddFormField;
