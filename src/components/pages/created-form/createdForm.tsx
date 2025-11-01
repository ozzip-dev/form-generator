"use client";
import { CheckboxField } from "@/components/inputs/CheckboxField";
import InputFields from "@/components/inputs/InputFields";
import TextareaFields from "@/components/inputs/TextareaFields";
import Button from "@/components/ui/buttons/Button";
import { FormSerialized } from "@/types/form";
import { useForm } from "react-hook-form";

type Props = {
  form: FormSerialized;
};

const CreatedForm = (props: Props) => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    console.log("", data);
  };

  const { title, description, inputs } = props.form;

  console.log("", props.form);

  const formFields = inputs
    .sort((a, b) => a.order - b.order)
    .map(({ type, header, description, required }: any, idx: number) => {
      if (type === "checkbox") {
        const dataCheckboxOptions = [
          { label: "label", name: "name", value: false },
          { label: "label", name: "namet", value: false },
        ];
        return (
          <CheckboxField
            key={idx}
            label={header}
            required={required}
            description={description}
            name={header}
            options={dataCheckboxOptions}
            control={control}
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
          />
        );
      }
    });

  return (
    <div className="flex justify-center ">
      <div className="w-4/5">
        <h1 className="text-4xl">{title}</h1>
        {description && <h2 className="text-2xl">{description}</h2>}
        <div className="text-red-600 text-sm mb-6">* Odpowiedź wymagana</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-4/5 bg-zinc-100 p-4"
        >
          {formFields}

          <Button message="Zatwierdź" disabled={false} />
        </form>{" "}
        <div className="w-fit ml-auto">
          <Button message="Opublikuj" type="button" />
        </div>
      </div>
    </div>
  );
};

export default CreatedForm;
