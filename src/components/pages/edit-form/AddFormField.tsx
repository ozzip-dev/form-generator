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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useErrorBoundary } from "react-error-boundary";
import { FormProvider, useForm } from "react-hook-form";
import { addFormFieldAction } from "@/actions/edit-form/addFormFieldAction";
import { dataSelectOptions } from "./editFormData";
import Icon from "@/components/shared/icons/Icon";
import Card from "@/components/shared/Card";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import EditFormInput from "./editFormInput/EditFormInput";



const AddFormField = () => {
  const { formId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

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
    watch,
  } = methods;

  const selectedType = watch("type");



  useAutoLoader(isSubmitting);

  const { showBoundary } = useErrorBoundary();

  const onSubmit = async (data: AddFormFieldSchema) => {
    try {
      const resp = await addFormFieldAction(formId as string, {
        ...data,
        type: data.type as InputType,
        validation: {},
        options: [],
      });

      if (!resp) {
        reset();
        return;
      }

      if ("validationErrors" in resp) {
        setClientErrors(resp.validationErrors, setError);
        return;
      }

      if ('inputId' in resp) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("newInputId", resp.inputId ?? "");
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.replace(newUrl, { scroll: false });
        router.refresh();
      } else {
        router.refresh();
      }

      reset();
    } catch (err) {
      showBoundary(err);
    }
  };

  const dataInputsHeader = [
    {
      name: "header",
      placeholder: "Pytanie",
      type: "text",
      floatingLabel: selectedType === "paragraph" ? "Podaj opis" : "Podaj pytanie",
    },
  ];



  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="!bg-white !border-0 !shadow-none md:flex md:items-center mb-16">
          <div className="md:w-4/6 md:flex justify-between">
            <div className="md:w-[45%]">
              <InputFields
                inputsData={dataInputsHeader}
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
            className="bg-accent !rounded-full
             p-2 m-auto mt-8 md:m-0 md:ml-auto"
          />
        </Card>
      </form>
    </FormProvider>
  );
};

export default AddFormField;




