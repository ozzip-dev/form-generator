import {
  CheckboxGroupField,
  InputFields,
  RadioGroupField,
} from "@/components/shared";
import FormDescription from "@/components/shared/inputs/FormDescription";
import { InputType } from "@/enums";
import { FormInput, FormOption } from "@/types/input";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

export type RendererParams = {
  input: FormInput;
  errors?: FieldErrors<any>;
  register?: UseFormRegister<any>;
  control?: Control<any>;
};

export const renderRadio = ({ input, errors }: RendererParams) => {
  const { id, header, description, required, unique, options } = input;

  return (
    <RadioGroupField
      key={id}
      name={id!}
      label={header}
      description={description}
      required={required}
      unique={unique}
      options={options}
      errorMsg={errors}
    />
  );
};

export const renderInput = ({ input, errors, register }: RendererParams) => {
  const { id, header, description, required, unique, type } = input;

  const placeholderTexts: Partial<Record<InputType, string>> = {
    number: "Numer",
    email: "Email",
    date: "",
  };
  const placeholder = placeholderTexts[type] || "Odpowiedź";

  const inputType = type === "superText" ? "textarea" : type;

  return (
    <InputFields
      key={id}
      inputsData={[
        {
          staticLabel: header,
          name: id!,
          placeholder,
          type: inputType,
          description,
          required,
          unique,
        },
      ]}
      register={register}
      errorMsg={errors}
    />
  );
};

export const renderCheckbox = ({ input, control }: RendererParams) => {
  const { id, header, description, required, unique, options } = input;

  const dataCheckboxOptions =
    options.map((option: FormOption) => ({
      name: option.label,
      optionId: option.value,
      checkboxLabel: option.label,
    })) ?? [];

  return (
    <CheckboxGroupField
      key={id}
      groupLabel={header}
      groupDescription={description}
      control={control!}
      name={id!}
      options={dataCheckboxOptions}
      required={required}
      unique={unique}
    />
  );
};

export const renderParagraph = ({ input }: RendererParams) => {
  return (
    <FormDescription
      key={input.id}
      description={input.description}
      variant="published"
    />
  );
};
