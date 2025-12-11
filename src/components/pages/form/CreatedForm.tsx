"use client";

import { submitFormAction } from "@/actions/form/submitFormAction";
import { Button } from "@/components/shared";
import { useToast } from "@/hooks/useToast";
import { uniqueErrorMessage } from "@/lib/error";
import { createdFormSchema } from "@/lib/zodSchema/createdFormSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSX, useEffect, useState } from "react";
import {
  Control,
  FieldErrors,
  FormProvider,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import {
  renderCheckbox,
  renderInput,
  renderRadio,
  renderTextarea,
} from "./CreatedFormFields";
import SuccesMsg from "./SuccesMsg";
import { FormInput } from "@/types/input";
import { setClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import CheckboxSwitch from "@/components/shared/inputs/CheckboxSwitch";

type FieldRenderer = (
  input: FormInput,
  errors: FieldErrors<any>,
  register: UseFormRegister<any>,
  control: Control<any>
) => JSX.Element;

const defaultValues = (inputs: FormInput[]) => {
  const defaultValues = inputs.reduce((formObject: any, input: any) => {
    const { type, options, id } = input;

    const checkboxValues = options.reduce((optionsObject: any, option: any) => {
      optionsObject[option.label] = "";
      return optionsObject;
    }, {});

    if (type === "checkbox") {
      formObject[id] = checkboxValues;
    } else formObject[id] = "";

    return formObject;
  }, {});

  return defaultValues;
};

type Props = {
  form: FormSerialized;
  isPreview?: boolean;
};

const CreatedForm = (props: Props) => {
  const { title, description, inputs } = props.form;
  const schema = createdFormSchema(props.form.inputs);
  const { toast } = useToast();
  const [isSuccess, setSuccess] = useState(false);

  // console.log("defaultValues(inputs),", defaultValues(inputs));

  const methods = useForm({
    defaultValues: defaultValues(inputs),
    resolver: zodResolver(schema),
    // resolver: async (values) => ({ values, errors: {} }),
    mode: "all",
  });

  // console.log("inputs", inputs);

  const {
    register,
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    reset,
    setError,
  } = methods;

  useEffect(() => {
    console.log("FORM VALUES", methods.getValues());
  }, [methods.watch()]);

  const onSubmit = async (data: any) => {
    console.log("data", data);
    const _id = props.form._id?.toString();
    if (!_id) return;

    try {
      const resp = await submitFormAction(_id, data, inputs);

      if (resp?.validationErrors) {
        setClientErrors(resp.validationErrors, setError);
        return;
      }
      setSuccess(true);
      reset();
    } catch (e) {
      console.log("blad ", e);
      const err = e as Error;
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

  const fieldRenderers: Record<string, FieldRenderer> = {
    text: renderInput,
    superText: renderTextarea,
    number: renderInput,
    email: renderInput,
    date: renderInput,
    singleSelect: renderRadio,
    checkbox: renderCheckbox,
  };

  const formFields = inputs
    .sort((a, b) => a.order - b.order)
    .map((input) => {
      const renderer = fieldRenderers[input.type];
      return renderer(input, errors, register, control);
    });

  return (
    <div className="flex justify-center ">
      {isSuccess && <SuccesMsg setSucces={setSuccess} />}
      <div className="w-4/5">
        <h1 className="text-4xl">{title}</h1>
        {description && <h2 className="text-2xl">{description}</h2>}
        <div className="text-red-600 text-sm mb-6">* Odpowiedź wymagana</div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-4/5 bg-zinc-100 p-4 my-4"
          >
            {formFields}

            {/* <CheckboxSwitch label={"header"} name="llll" control={control} /> */}
            <Button
              message="Zatwierdź"
              disabled={props.isPreview ? true : false}
              type="submit"
              isLoading={isSubmitting}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreatedForm;
