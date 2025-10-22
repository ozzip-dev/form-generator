"use client";

import { AddInputToDraft } from "@/actions/create-form";
import InputError from "@/components/inputs/InputError";
import InputFields from "@/components/inputs/InputFields";
import Select from "@/components/inputs/Select";
import ButtonSubmit from "@/components/ui/buttons/ButtonSubmit";
import { InputType } from "@/enums";
import IconPlus from "@/icons/iconPlus/IconPlus";
import {
  addFormFieldSchema,
  TAddFormFieldSchema,
} from "@/lib/zodShema/addFormFieldShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useErrorBoundary } from "react-error-boundary";
import FullscreenLoader from "@/components/ui/loaders/FullscreenLoader";

const dataInputsheader = [
  {
    name: "header",
    placeholder: "Nazwa pola",
    type: "text",
  },
];

const AddFormField = () => {
  const inputTypes = Object.values(InputType);
  const { formId } = useParams();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TAddFormFieldSchema>({
    resolver: zodResolver(addFormFieldSchema),
  });
  const { showBoundary } = useErrorBoundary();

  const onSubmit = async (data: TAddFormFieldSchema) => {
    try {
      await AddInputToDraft(formId as string, {
        ...data,
        type: data.type as InputType,
        validation: {},
      });
      reset();
    } catch (err) {
      showBoundary(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex mb-6 px-4">
      <div className="flex mb-6">
        <InputFields
          inputsData={dataInputsheader}
          register={register}
          errorMsg={errors}
        />

        <div className="w-48">
          <Controller
            name="type"
            control={control}
            rules={{ required: "Wybór jest wymagany" }}
            render={({ field, fieldState }) => (
              <Select
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                errorMsg={fieldState.error?.message}
                placeholder="Wybierz"
                options={[
                  { label: "Odpowiedź krótka", value: "text" },
                  { label: "Ddpowiedź długa", value: "superText" },
                  { label: "Email", value: "email" },
                  { label: "Data", value: "date" },
                  { label: "Numer", value: "number" },
                  { label: "Wybór pojedynczy", value: "singleSelect" },
                  { label: "Wybór wielokrotny", value: "checkbox" },
                ]}
              />
            )}
          />
        </div>

        {/* <select {...register("type")}>
          {inputTypes.map((el) => (
            <option value={el} key={el}>
              {el}
            </option>
          ))}
        </select> */}

        <div className="w-fit">
          <ButtonSubmit
            isSubmitting={isSubmitting}
            icon={<IconPlus style="h-7 w-7 bg-white" />}
          />
        </div>
      </div>
      <InputError errorMsg={errors?.root?.message} />
    </form>
  );
};

export default AddFormField;
