import {
  CheckboxGroupField,
  InputFields,
  RadioGroupField,
} from "@/components/shared";
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
  const { id, header, description, required, options } = input;

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

export const renderInput = ({ input, errors, register }: RendererParams) => {
  const { id, header, description, required, type } = input;

  const placeholderTexts: Partial<Record<InputType, string>> = {
    number: "Numer",
    email: "Email",
    date: "",
  };
  const placeholder = placeholderTexts[type] || "Odpowiedź";

  console.log("placeholder", placeholder);

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
        },
      ]}
      register={register}
      errorMsg={errors}
    />
  );
};

export const renderCheckbox = ({ input, control }: RendererParams) => {
  const { id, header, description, required, options } = input;

  const dataCheckboxOptions =
    options.map((option: FormOption) => ({
      name: option.label,
      optionId: option.value,
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
    />
  );
};

export const renderParagraph = ({ input }: RendererParams) => {
  return <div key={input.id}>{input.description}</div>;
};
