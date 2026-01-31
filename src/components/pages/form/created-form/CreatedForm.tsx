"use client";

import { submitFormAction } from "@/actions/form/submitFormAction";
import { Button } from "@/components/shared";
import { setClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { uniqueErrorMessage } from "@/lib/error";
import { createdFormSchema } from "@/lib/zodSchema/createdFormSchema";
import { FormSerialized } from "@/types/form";
import { FormInput } from "@/types/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSX, useEffect, useState } from "react";
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
import Card from "@/components/shared/Card";
import CreatedFormTopError from "./CreatedFormTopError";
import CreatedFormTopImage from "./CreatedFormTopImage";
import CreatedFormFooter from "./CreatedFormFooter";
import FormDescription from "@/components/shared/inputs/FormDescription";

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
  const { title, description, inputs, displayAuthorEmail } = props.form;
  const schema = createdFormSchema(props.form.inputs);
  const { toast } = useToast();
  const [isSuccess, setSuccess] = useState(false);

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

  // useEffect(() => {
  //   console.log("FORM VALUES", methods.getValues());
  // }, [methods.watch()]);

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
    } catch (e) {
      const err = e as Error;

      console.log('uniqueErrorMessage', uniqueErrorMessage)

      const title =
        err.message == uniqueErrorMessage
          ? "Formularz z podanymi danymi zostal juz wyslany. Skontaktuj sie z administratorem."
          : "Blad. Sprobuj ponownie.";
      toast({
        title,
        variant: "error",
      });
    }
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
      // return renderer({
      //   input,
      //   errors,
      //   register,
      //   control,
      // });

      return <Card key={input.id}>
        {renderer({
          input,
          errors,
          register,
          control,
        })}
      </Card>
    });

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <>
      <div className="container !max-w-[800px] my-4">
        <CreatedFormTopError isError={hasErrors} />
        {isSuccess && <SuccesMsg setSucces={setSuccess} />}

        {props.headerFileData &&
          <CreatedFormTopImage headerFileData={props.headerFileData} />
        }


        <Card className="mb-8">
          <h1 className="text-xl">{title}</h1>
          {description && (
            <FormDescription description={description} variant="published" />
          )}
          <div className="text-error text-2xs">* Odpowiedź wymagana</div>
          <div className="text-error text-2xs">! Odpowiedź jednorazowa </div>


        </Card>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >

            {formFields}

            <div className=" flex flex-col sm:justify-end gap-8 sm:gap-16 items-center sm:flex-row ">
              <Button
                message="Wyczyść"
                type="button"
                onClickAction={handleCleanForm}
                className="!bg-white !text-accent hover:!bg-accent hover:!text-white"
              />

              <Button
                message="Zatwierdź"
                disabled={props.isPreview ? true : false}
                type="submit"
                isLoading={isSubmitting}
                className="w-full md:w-fit"
              />
            </div>
          </form>
        </FormProvider>
      </div>

      {displayAuthorEmail && props.authorEmail && (
        <CreatedFormFooter authorEmail={props.authorEmail} />
      )}
    </>
  );
};

export default CreatedForm;
