"use client";

import { SubmitForm } from "@/actions/form/SubmitForm";
import {
  Button,
  CheckboxGroupField,
  InputFields,
  RadioGroupField,
  TextareaFields,
} from "@/components/shared";
import { useToast } from "@/hooks/useToast";
import { uniqueErrorMessage } from "@/lib/error";
import { createdFormSchema } from "@/lib/zodSchema/createdFormSchema";
import { FormSerialized } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "lucide-react";
import { ObjectId } from "mongodb";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  form: FormSerialized;
  isPreview?: boolean
};

const CreatedForm = (props: Props) => {
  const { form: { title, description, inputs }, isPreview = false } = props;
  const schema = createdFormSchema(props.form.inputs);
  const { toast } = useToast();

  const defaultValues = inputs.reduce((acu: any, input) => {
    const { header, type, options, id } = input;
    const inputLabel = header;

    const inputOptions = options.reduce(
      (acu: Record<string, boolean>, option: string) => {
        acu[option] = false;

        return acu;
      },
      {}
    );

    const checkboxOptions = (acu[inputLabel] =
      type === "checkbox" ? inputOptions : "");
    return acu;
  }, {});

  const methods = useForm({
    defaultValues,
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

  // useEffect(() => {
  //   const subscription = watch((values) => {
  //     console.log("Aktualne wartości:", values);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const onSubmit = async (data: any) => {
    const _id = props.form._id?.toString()
    if (!_id) return // ?

    // TODO: czemu trafiają tu Labele/Headery? Usunąć z obiektu i usunąć ten kod
    const keys = Object.keys(data)
    const inputIds = inputs.map(({ id }) => id)
    keys.forEach((key) => {
      if (!inputIds.includes(key)) delete data[key]
    })

    try {
      await SubmitForm(_id, data)
      toast({
        title: 'Sukces! Dzieki',
        variant: "success",
      });
    } catch(e) {
      console.log('blad ', e)
      const err = e as Error
      const title = err.message == uniqueErrorMessage
        ? 'Formularz z podanymi danymi zostal juz wyslany. Skontaktuj sie z administratorem.'
        : 'Blad. Sprobuj ponownie.'
      toast({
        title,
        variant: "error",
      });
    }
  }

  const formFields = inputs
    .sort((a, b) => a.order - b.order)
    .map(
      ({ type, header, description, required, options, id }, idx: number) => {
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
              name={id!}
              options={dataCheckboxOptions}
              control={control}
              errorMsg={errors}
            />
          );
        } else if (type === "singleSelect") {
          const dataRadioOoptions = options?.map((option: string) => {
            return { label: option, value: option };
          });

          return (
            <RadioGroupField
              key={idx}
              name={id!}
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
              name: id!,
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
              name: id!,
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
              onChange={(name, v) => { console.log(name, v) }}
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

            {!isPreview && <Button message="Zatwierdź" disabled={false} type="submit" />}
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
