"use client";

import {
  Button,
  CheckboxGroupField,
  InputFields,
  RadioGroupField,
  TextareaFields,
} from "@/components/shared";
import { createdFormSchema } from "@/lib/zodSchema/createdFormSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  form: any;
};

const CreatedForm = (props: Props) => {
  const { title, description, inputs } = props.form;
  const schema = createdFormSchema(props.form.inputs);

  const methods = useForm({
    defaultValues: {},
    resolver: zodResolver(schema),
    mode: "all",
  });

  const {
    register,
    reset,
    formState: { errors },
    trigger,
    control,
    setError,
    watch,
    handleSubmit,
  } = methods;

  console.log("er", errors);

  // useEffect(() => {
  //   const subscription = watch((values) => {
  //     console.log("Aktualne wartości:", values);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const onSubmit = (data: any) => {
    console.log("sss", data);
  };

  // console.log("", props.form);

  const formFields = inputs
    .sort((a: any, b: any) => a.order - b.order)
    .map(
      ({ type, header, description, required, options }: any, idx: number) => {
        if (type === "checkbox") {
          const dataCheckboxOptions = options?.map((option: any) => {
            return { label: option, name: option, value: false };
          });

          return (
            <CheckboxGroupField
              key={idx}
              label={header}
              required={required}
              description={description}
              name={header}
              options={dataCheckboxOptions}
              control={control}
              errorMsg={errors}
            />
          );
        } else if (type === "singleSelect") {
          const dataRadioOoptions = options?.map((option: any) => {
            return { label: option, value: option };
          });

          return (
            <RadioGroupField
              key={idx}
              name={header}
              label={header}
              description={description}
              required={required}
              options={dataRadioOoptions}
              errorMsg={errors}
              optionClass="flex w-fit px-4 mb-1 justify-center items-center border rounded-lg py-2 cursor-pointer hover:bg-gray-100 data-[checked=true]:bg-blue-500 data-[checked=true]:text-white"
            />
          );
        } else if (type === "superText") {
          const dataInputTextarea = [
            {
              label: header,
              name: header,
              placeholder: "Odpowiedź",
              description,
              required,
            },
          ];

          return (
            <TextareaFields
              key={idx}
              inputsData={dataInputTextarea}
              register={register}
              errorMsg={errors}
            />
          );
        } else {
          let placeholder;

          switch (type) {
            case "text": {
              placeholder = "Odpowiedź";
              break;
            }
            case "number": {
              placeholder = "Numer";
              break;
            }
            case "email": {
              placeholder = "Email";
              break;
            }
          }

          const dataInputText = [
            {
              label: header,
              name: header,
              placeholder,
              type,
              description,
              required,
            },
          ];

          return (
            <InputFields
              key={idx}
              inputsData={dataInputText}
              register={register}
              errorMsg={errors}
            />
          );
        }
      }
    );

  return (
    <div className="flex justify-center ">
      <div className="w-4/5">
        <h1 className="text-4xl">{title}</h1>
        {description && <h2 className="text-2xl">{description}</h2>}
        <div className="text-red-600 text-sm mb-6">* Odpowiedź wymagana</div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-4/5 bg-zinc-100 p-4"
          >
            {formFields}

            <Button message="Zatwierdź" disabled={false} type="submit" />
          </form>
        </FormProvider>
        {/* <div className="w-fit ml-auto">
          <Button message="Opublikuj" type="button" />
        </div> */}
      </div>
    </div>
  );
};

export default CreatedForm;
