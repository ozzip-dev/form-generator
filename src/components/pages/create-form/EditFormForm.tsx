import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form"; // 👈 dodaj FormProvider
import { FormSerialized } from "@/types/form";
import { FormInput, Input } from "@/types/input";
import AddCustomField from "./AddCustomField";
import { formatDateAndHour } from "@/helpers/dates/formatDateAndHour";
import CreateFormInput from "@/components/form/CreateFormInput";

type Props = {
  form: FormSerialized;
  templateInputs: Input[];
  addInput: (input: Input) => Promise<void>;
  removeInput: (id: string) => Promise<void>;
  moveInputDown: (id: string) => Promise<void>;
  moveInputUp: (id: string) => Promise<void>;
  updateInput?: (id: string, data: Partial<FormInput>) => Promise<void>;
  updateForm?: (data: {
    title?: string;
    description?: string;
  }) => Promise<void>;
};

export default function EditFormForm({
  form,
  templateInputs,
  addInput,
  removeInput,
  moveInputDown,
  moveInputUp,
  updateInput,
  updateForm,
}: Props) {
  const { createdAt, updatedAt, title, description, inputs } = form;
  const created = formatDateAndHour(createdAt);
  const updated = formatDateAndHour(updatedAt);

  // console.log("", inputs);

  const methods = useForm({
    defaultValues: {
      title,
      description,
      inputs,
    },
  });

  const { watch, register, setValue, reset } = methods;
  const watched = watch();

  useEffect(() => {
    reset({
      title,
      description,
      inputs,
    });
  }, [inputs, title, description, reset]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (updateForm) {
        updateForm({
          title: watched.title,
          description: watched.description,
        });
      }
    }, 600);
    return () => clearTimeout(timeout);
  }, [watched.title, watched.description, updateForm]);

  useEffect(() => {
    setValue("title", title);
    setValue("description", description);
  }, [title, description, setValue]);

  const handleUpdateInput = async (id: string, data: Partial<FormInput>) => {
    if (updateInput) {
      await updateInput(id, data);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="p-4 [&_h2]:text-xl [&_h2]:mt-6">
        <div className="flex justify-between">
          <div className="text-xs text-gray-400 mt-1">Utworzono: {created}</div>
          <div className="text-xs text-gray-400 mt-1">Edytowano: {updated}</div>
        </div>

        <form className="mt-4 space-y-2">
          <input
            type="text"
            {...register("title")}
            className="block border border-black rounded px-2 py-1 w-full"
            placeholder="Tytuł formularza"
          />

          <input
            type="text"
            {...register("description")}
            className="block border border-black rounded px-2 py-1 w-full"
            placeholder="Opis formularza"
          />

          <div className="my-6 flex flex-col gap-4">
            {inputs
              .sort((a, b) => a.order - b.order)
              .map((el, index) => (
                <CreateFormInput
                  key={el.id}
                  input={el}
                  index={index}
                  removeInput={removeInput}
                  moveInputDown={moveInputDown}
                  moveInputUp={moveInputUp}
                  updateInput={handleUpdateInput}
                />
              ))}
          </div>
        </form>

        <AddCustomField addInput={addInput} />
      </div>
    </FormProvider>
  );
}
