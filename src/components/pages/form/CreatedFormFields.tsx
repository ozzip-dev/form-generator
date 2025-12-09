import {
  CheckboxGroupField,
  InputFields,
  RadioGroupField,
  TextareaFields,
} from "@/components/shared";
import { InputType } from "@/enums";
import { FormInput, FormOption } from "@/types/input";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

export const renderRadio = (
  { id, header, description, required, options }: FormInput,
  errors: FieldErrors<any>
) => {
  return (
    <RadioGroupField
      key={id}
      name={id!}
      label={header}
      description={description}
      required={required}
      options={options}
      errorMsg={errors}
      optionClass="flex w-fit px-4 mb-1 justify-center items-center border rounded-lg py-2 cursor-pointer hover:bg-gray-100 data-[checked=true]:bg-blue-500 data-[checked=true]:text-white"
    />
  );
};

export const renderTextarea = (
  { id, header, description, required }: FormInput,
  errors: FieldErrors<any>,
  register: UseFormRegister<any>
) => {
  return (
    <TextareaFields
      key={id}
      inputsData={[
        {
          label: header,
          name: id!,
          placeholder: "Odpowiedź",
          description,
          required,
        },
      ]}
      register={register}
      errorMsg={errors}
    />
  );
};

export const renderInput = (
  { id, header, description, required, type }: FormInput,
  errors: FieldErrors<any>,
  register: UseFormRegister<any>
) => {
  const placeholderTexts: Partial<Record<InputType, string>> = {
    number: "Numer",
    email: "Email",
    date: "",
  };
  const placeholder: string = placeholderTexts[type] || "Odpowiedź";

  return (
    <InputFields
      key={id}
      inputsData={[
        {
          label: header,
          name: id!,
          placeholder,
          type,
          description,
          required,
        },
      ]}
      register={register}
      errorMsg={errors}
    />
  );
};

export const renderCheckbox = (
  { id, header, description, required, options }: FormInput,
  errors: FieldErrors<any>,
  register: UseFormRegister<any>,
  control: Control<any>
) => {
  // console.log("options", options);

  const dataCheckboxOptions =
    options.map((option: FormOption) => ({
      label: option.label,
      name: option.label,
      value: false,
      optionId: option.value,
    })) ?? [];

  return (
    <CheckboxGroupField
      key={id}
      groupLabel={header}
      required={required}
      groupDescription={description}
      name={id!}
      options={dataCheckboxOptions}
      control={control}
      errorMsg={errors}
    />
  );
};
