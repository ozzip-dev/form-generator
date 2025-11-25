"use client";

import { submitFormAction } from "@/actions/form/submitFormAction";
import { Button, CheckboxGroupField } from "@/components/shared";
import { useToast } from "@/hooks/useToast";
import { uniqueErrorMessage } from "@/lib/error";
import { createdFormSchema } from "@/lib/zodSchema/createdFormSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSX, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RenderInput, RenderRadio, RenderTextarea } from "./CreatedFormFields";

type Props = {
  form: FormSerialized;
  isPreview?: boolean;
};

const CreatedForm = (props: Props) => {
  const { title, description, inputs } = props.form;
  const schema = createdFormSchema(props.form.inputs);
  const { toast } = useToast();

  const defaultValues = inputs.reduce((acu: any, input: any) => {
    const { id, type, options } = input;

    if (type === "checkbox") {
      acu[id] =
        options && Array.isArray(options) && options.length > 0
          ? Object.fromEntries(options.map((op: string) => [op, false]))
          : {};
    } else {
      acu[id] = "";
    }

    return acu;
  }, {});

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "all",
  });

  const {
    register,
    formState: { errors },
    control,
    watch,
    handleSubmit,
  } = methods;

  useEffect(() => {
    const subscription = watch((values) => {
      console.log("Aktualne wartości:", values);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: any) => {
    console.log("sss", data);

    const _id = props.form._id?.toString();
    if (!_id) return; // ?

    // TODO: czemu trafiają tu Labele/Headery? Usunąć z obiektu i usunąć ten kod
    const keys = Object.keys(data);
    const inputIds = inputs.map(({ id }) => id);
    keys.forEach((key) => {
      if (!inputIds.includes(key)) delete data[key];
    });

    try {
      await submitFormAction(_id, data);
      toast({
        title: "Sukces! Dzieki",
        variant: "success",
      });
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

  const fieldRenderers: Record<
    string,
    (input: any, errors: any, register: any, control: any) => JSX.Element
  > = {
    text: RenderInput,
    superText: RenderTextarea,
    number: RenderInput,
    email: RenderInput,
    date: RenderInput,
    singleSelect: RenderRadio,
  };

  const formFields = inputs
    .sort((a, b) => a.order - b.order)
    .map((input, idx) => {
      const { type, id, header, required, options } = input;
      if (type === "checkbox") {
        const dataCheckboxOptions =
          options.map((option: string) => ({
            label: option,
            name: option,
            value: false,
          })) ?? [];

        return (
          <CheckboxGroupField
            key={idx}
            label={header}
            required={required}
            description={description}
            name={id!}
            options={dataCheckboxOptions}
            control={control}
            errorMsg={errors}
          />
        );
      } else {
        const renderer = fieldRenderers[input.type];
        return renderer(input, errors, register, control);
      }
    });

  return (
    <div className="flex justify-center ">
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

            <Button
              message="Zatwierdź"
              disabled={props.isPreview ? true : false}
              type="submit"
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreatedForm;
