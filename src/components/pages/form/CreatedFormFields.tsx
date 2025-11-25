import {
  InputFields,
  RadioGroupField,
  TextareaFields,
} from "@/components/shared";

export const RenderRadio = (
  { id, header, description, required, options }: any,
  errors: any
) => {
  const opts = options.map((op: string) => ({
    label: op,
    value: op,
  }));

  return (
    <RadioGroupField
      key={id}
      name={id}
      label={header}
      description={description}
      required={required}
      options={opts}
      errorMsg={errors}
      optionClass="flex w-fit px-4 mb-1 justify-center items-center border rounded-lg py-2 cursor-pointer hover:bg-gray-100 data-[checked=true]:bg-blue-500 data-[checked=true]:text-white"
    />
  );
};

export const RenderTextarea = (
  { id, header, description, required }: any,
  errors: any,
  register: any
) => {
  return (
    <TextareaFields
      key={id}
      inputsData={[
        {
          label: header,
          name: id,
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

export const RenderInput = (
  { id, header, description, required, type }: any,
  errors: any,
  register: any
) => {
  const placeholder =
    type === "number"
      ? "Numer"
      : type === "email"
      ? "Email"
      : type === "date"
      ? ""
      : "Odpowiedź";

  return (
    <InputFields
      key={id}
      inputsData={[
        {
          label: header,
          name: id,
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
