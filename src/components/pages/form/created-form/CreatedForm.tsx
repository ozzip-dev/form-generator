"use client";

import { submitFormAction } from "@/actions/form/submitFormAction";
import { Button, Card } from "@/components/shared";
import { setClientErrors } from "@/helpers/helpers-validation/handleFormErrors";
import { createdFormSchema } from "@/lib/zod-schema/createdFormSchema";
import { FormSerialized } from "@/types/form";
import { FormInput } from "@/types/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSX, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  renderCheckbox,
  RendererParams,
  renderInput,
  renderParagraph,
  renderRadio,
} from "./CreatedFormFields";
import SuccesMsg from "./SuccesMsg";
import { useToast } from "@/context/ToastProvider";
import {
  isInputSubmittable,
  isInputTypeCheckbox,
} from "@/helpers/inputHelpers";
import CreatedFormTopError from "./CreatedFormTopError";
import CreatedFormTopImage from "./CreatedFormTopImage";
import FormDescription from "@/components/shared/inputs/FormDescription";
import FieldIndicators from "./FieldIndicators";
import CreatedFormAuthor from "./CreatedFormAuthor";
import ResultsMode from "./ResultsMode";
import { confirmAction } from "@/helpers/confirmAction";

const defaultValues = (inputs: FormInput[]) => {
  const defaultValues = inputs.reduce((formObject: any, input: FormInput) => {
    const { options, id } = input;

    const checkboxValues = options.reduce((optionsObject: any, option: any) => {
      optionsObject[option.label] = "";
      return optionsObject;
    }, {});

    formObject[id as string] = isInputTypeCheckbox(input) ? checkboxValues : "";

    return formObject;
  }, {});

  return defaultValues;
};

type Props = {
  form: FormSerialized;
  headerFileData?: string;
  authorEmail?: string;
  isPreview?: boolean;
};

const CreatedForm = (props: Props) => {
  const { title, description, inputs, displayAuthorEmail, resultVisibility } =
    props.form;
  const schema = createdFormSchema(props.form.inputs);
  const { toast } = useToast();
  const [isSuccess, setSuccess] = useState(false);

  console.log("", props.form);

  const isRequiredInput = inputs.filter(
    ({ required }) => required === true,
  ).length;
  const isUniqueInput = inputs.filter(({ unique }) => unique === true).length;
  const isHiddenInput = inputs.filter(({ hidden }) => hidden === true).length;

  const methods = useForm({
    defaultValues: defaultValues(inputs),
    resolver: zodResolver(schema),
    mode: "all",
  });

  const {
    register,
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    reset,
    setError,
  } = methods;

  const onSubmit = async (data: any) => {
    const _id = props.form._id?.toString();
    if (!_id) return;

    try {
      const submittableInputs = inputs.filter(isInputSubmittable);
      const submittableInputIds: string[] = submittableInputs.map(
        ({ id }) => id!,
      );

      for (const key of Object.keys(data)) {
        if (!submittableInputIds.includes(key)) {
          delete data[key];
        }
      }

      const resp = await submitFormAction(_id, data, submittableInputs);

      if (resp?.validationErrors) {
        setClientErrors(resp.validationErrors, setError);
        return;
      }
      setSuccess(true);
      reset();
    } catch (_) {
      toast({
        title: "Blad. Sprobuj ponownie",
        variant: "error",
      });
    }
  };

  const confirmHandleSubmit = async (data: any) => {
    await confirmAction({
      action: () => onSubmit(data),
      confirmText: "Czy na pewno wysłać wyniki?",
    });
  };

  const handleCleanForm = () => {
    reset();
  };

  const fieldRenderers: Record<string, (ctx: RendererParams) => JSX.Element> = {
    text: renderInput,
    superText: renderInput,
    number: renderInput,
    email: renderInput,
    date: renderInput,
    singleSelect: renderRadio,
    checkbox: renderCheckbox,
    paragraph: renderParagraph,
  };

  const formFields = inputs
    .sort((a, b) => a.order - b.order)
    .map((input) => {
      const renderer = fieldRenderers[input.type];
      return (
        <Card key={input.id}>
          {renderer({
            input,
            errors,
            register,
            control,
          })}
        </Card>
      );
    });

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <>
      <div className="container my-4 !max-w-[800px]">
        <CreatedFormTopError isError={hasErrors} />
        {isSuccess && <SuccesMsg setSucces={setSuccess} />}
        {props.headerFileData && (
          <CreatedFormTopImage headerFileData={props.headerFileData} />
        )}
        <Card className="mb-8">
          <h1 className="mb-8 text-lg">{title}</h1>
          {description && (
            <FormDescription description={description} variant="published" />
          )}

          <FieldIndicators
            isRequiredInput={!!isRequiredInput}
            isUniqueInput={!!isUniqueInput}
            isHiddenInput={!!isHiddenInput}
          />
        </Card>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(confirmHandleSubmit)}
            className="flex flex-col gap-8"
          >
            {formFields}

            <div className="my-16 flex flex-col items-center gap-8 sm:flex-row sm:justify-end sm:gap-16">
              <Button
                message="Wyczyść"
                type="button"
                onClickAction={handleCleanForm}
                className="w-full !bg-white !text-accent hover:!bg-accent hover:!text-white sm:w-fit"
              />

              <Button
                message="Zatwierdź"
                disabled={props.isPreview ? true : false}
                type="submit"
                isLoading={isSubmitting}
                className="w-full sm:w-fit"
              />
            </div>
          </form>
        </FormProvider>
      </div>
      <footer className="flex justify-center pb-10 text-xs">
        <div className="container">
          <ResultsMode resultVisibility={resultVisibility} />
          {displayAuthorEmail && props.authorEmail && (
            <CreatedFormAuthor authorEmail={props.authorEmail} />
          )}
        </div>
      </footer>
    </>
  );
};

export default CreatedForm;
