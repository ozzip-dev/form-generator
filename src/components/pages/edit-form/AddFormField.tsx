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
import Card from "@/components/shared/Card";

const dataInputsheader = [
  {
    name: "header",
    placeholder: "Pytanie",
    type: "text",
    floatingLabel: "Podaj pytanie",
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
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSubmitting && <FullscreenLoader />}
        <Card className="!bg-white !border-0 !shadow-none md:flex md:items-center">
          <div className="md:w-4/6 md:flex justify-between">
            <div className="md:w-[45%]">
              <InputFields
                inputsData={dataInputsheader}
                register={register}
                errorMsg={errors}
              />
            </div>

            <div className="md:w-[45%] md:max-w-[22rem]">
              <SelectFieldControler
                name="type"
                defaultValue="text"
                options={dataSelectOptions}
              />
            </div>
          </div>

          <Button
            icon={<Icon icon="plus-solid-full" size={30} color="white" />}
            variant="ghost"
            className="bg-accent rounded-full p-1 w-fit m-auto md:m-0 md:ml-auto md:mb-auto hover:bg-accent_light"
          />
        </Card>
      </form>
    </FormProvider>
  );
};

export default AddFormField;
