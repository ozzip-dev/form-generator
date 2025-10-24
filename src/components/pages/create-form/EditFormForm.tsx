"use client";

import { EditFormAction } from "@/actions/create-form/EditFormAction";
import EditFormInputs from "@/components/form/EditFormInputs";
import FormTypeSelect from "@/components/form/FormTypeSelect";
import InputFields from "@/components/inputs/InputFields";
import { formatDateAndHour } from "@/helpers/dates/formatDateAndHour";
import { FormType } from "@/enums/form";
import { FormSerialized } from "@/types/form";
import { FormInput } from "@/types/input";
import { useEffect, useRef } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editFormSchema, EditFormSchema } from "@/lib/zodShema/editFormSchema";
import SuspenseErrorBoundary from "@/components/ui/errors/SuspenseErrorBoundary";
import { handleInputChange } from "@/helpers/handleInputChange";

// export const handleInputChange = (
//   formId: string | undefined,
//   name: string,
//   value: string,
//   ref: React.RefObject<ReturnType<typeof setTimeout> | null>
// ) => {
//   console.log("aaaaa");

//   if (ref.current) clearTimeout(ref.current);

//   ref.current = setTimeout(async () => {
//     await EditFormAction(formId!, {
//       [name]: value,
//     });
//   }, 2000);
// };

const dataInputsTitle = [
  {
    label: "Tytuł",
    name: "title",
    placeholder: "Tytuł formularza",
    type: "text",
  },
  {
    label: "Opis",
    name: "description",
    placeholder: "Opis formularza",
    type: "text",
  },
];

type Props = {
  form: FormSerialized;
};

export default function EditFormForm(props: Props) {
  const {
    _id: formId,
    createdAt,
    updatedAt,
    title,
    description,
    inputs,
    type,
  } = props.form;

  const methods = useForm({
    defaultValues: {
      title,
      description,
      type,
      inputs,
    },
  });

  const {
    watch,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    reset({
      title,
      description,
      inputs,
      type,
    });
  }, [inputs, title, description, type, reset]);

  // const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // console.log("form", debounceRef);

  // const handleInputChange = (
  //   formId: string | undefined,
  //   name: string,
  //   value: string,
  //   ref: React.RefObject<ReturnType<typeof setTimeout> | null>
  // ) => {
  //   console.log("funkcja", debounceRef);
  //   if (ref.current) clearTimeout(ref.current);

  //   ref.current = setTimeout(async () => {
  //     await EditFormAction(formId!, {
  //       [name]: value,
  //     });
  //   }, 2000);
  // };

  return (
    <FormProvider {...methods}>
      <div className="p-4">
        <div className="flex justify-between">
          <div className="text-xs text-gray-400 mt-1">
            Utworzono: {formatDateAndHour(createdAt)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Edytowano: {formatDateAndHour(updatedAt)}
          </div>
        </div>

        <form className="mt-4 space-y-2">
          <FormTypeSelect register={register} />

          <div className="w-48">
            <InputFields
              inputsData={dataInputsTitle}
              register={register}
              errorMsg={errors}
              onChange={handleInputChange}
            />
          </div>

          <div className="my-6 flex flex-col gap-4">
            <div className="w-48"></div>
            {inputs
              .sort((a, b) => a.order - b.order)
              .map((el, index) => {
                const dataInputField = [
                  {
                    type: "text",
                    name: `inputs.${index}.header`,
                    placeholder: "Nazwa pola",
                  },
                ];

                return (
                  <SuspenseErrorBoundary
                    key={el.id}
                    size="sm"
                    errorMessage="Błąd przesyłu danych formularza"
                  >
                    {/* <InputFields
                      inputsData={dataInputField}
                      register={register}
                      onChange={handleInputChange}
                    /> */}
                    <EditFormInputs
                      key={el.id}
                      input={el}
                      index={index}
                      formId={formId!}
                      totalInputs={inputs.length}
                    />
                  </SuspenseErrorBoundary>
                );
              })}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
