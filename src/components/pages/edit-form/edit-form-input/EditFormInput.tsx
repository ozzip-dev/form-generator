"use client";

import { editInputLabelAction } from "@/actions/edit-form/edit-form-input/editInputLabelAction";
import { editInputTypeAction } from "@/actions/edit-form/edit-form-input/editInputTypeAction";
import { Card, InputFields } from "@/components/shared";
import { SelectFieldControler } from "@/components/shared/inputs/select-field/SelectFieldController";
import { useInputData } from "@/context/InputDataContextProvider";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useFormData } from "@/context/FormDataContextProvider";
import { InputType } from "@/enums";
import {
  isInputTypeParagraph,
  isInputWithOptions,
} from "@/helpers/inputHelpers";
import { useEditForm } from "@/hooks/useEditForm";
import {
  editInputFormSchema,
  EditInputFormSchema,
} from "@/lib/zod-schema/edit-form-schemas/editFormInputSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { dataSelectOptions } from "../editFormData";
import AddOption from "./AddOption";
import FormInputMoveRemoveButtons from "./FormInputMoveRemoveButtons";
import ToggleInputs from "./toggle-inputs/ToggleInputs";
import AddTextEditorBtn from "../AddTextEditorBtn";
import EditFormDescriptionEditor from "./EditFormDescriptionEditor";

const EditFormInput = () => {
  const { formId, input, inputIdx, inputNumber } = useInputData();

  const {
    id: inputId,
    required,
    order,
    type,
    header,
    description,
    options,
    unique,
    hidden,
  } = input;

  const [isPending, startTransition] = useTransition();

  const isParagraph = isInputTypeParagraph(input);
  const shouldShowDescription = isParagraph || !!description;

  const [isDescription, setDescription] = useState(!!description);
  const [showDescription, setShowDescription] = useState(shouldShowDescription);

  useEffect(() => {
    setShowDescription(shouldShowDescription);
  }, [shouldShowDescription]);

  const defaultValues = useMemo(
    () => ({
      header,
      description,
      options,
      required,
      unique,
      hidden,
      type,
    }),
    [header, description, options, required, unique, hidden, type],
  );

  const methods = useForm<EditInputFormSchema>({
    resolver: zodResolver(editInputFormSchema),
    defaultValues,
    mode: "all",
  });

  const {
    register,
    reset,
    formState: { errors },
    trigger,
    setError,
  } = methods;

  const { handleEdit: handleEditLabel, isLoading: isLoadingLabel } =
    useEditForm({
      formId,
      inputId,
      inputIdx: inputIdx,
      trigger,
      action: editInputLabelAction,
      mode: "inputLabel",
      setError,
    });

  const handleEditType = (type: InputType) => {
    startTransition(async () => {
      if (!formId || !inputId) return;
      await editInputTypeAction(formId, inputId, type);
    });
  };

  useAutoLoader(isPending);
  const isAnyLoading = [...Object.values(isLoadingLabel ?? {})].some(Boolean);
  useAutoLoader(isAnyLoading, "small");

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  // TODO Krzyztof: moze masz lepszy pomysl.
  // Musi byc reaktywne na zmiany w formie, np. dodanie/usunięcie inputu
  const formData = useFormData();
  useEffect(() => {
    if (!header) setError("header", { message: "Uzupełnij pytanie" });
  }, [header, setError, formData]);

  const dataInputLabel = [
    {
      type: "text",
      name: `header`,
      placeholder: "Pytanie",
      floatingLabel: `Edytuj pytanie ${inputNumber}`,
    },
  ];

  return (
    <Card className="">
      {!inputId ? (
        <div>Błąd pola fomrularza, skontanktuj się z administratorem</div>
      ) : (
        <FormProvider {...methods}>
          <form>
            <FormInputMoveRemoveButtons />

            <div className="items-center md:flex md:gap-12">
              <div className="flex min-w-0 flex-1 items-center">
                {!isInputTypeParagraph(input) ? (
                  <div className="w-full">
                    <InputFields
                      inputsData={dataInputLabel}
                      register={register}
                      errorMsg={errors.header as any}
                      onChange={handleEditLabel}
                    />
                  </div>
                ) : (
                  <div className="w-full">
                    <EditFormDescriptionEditor
                      setDescription={setDescription}
                      isDescription={showDescription}
                      variant="input"
                      onClose={() => setShowDescription(false)}
                    />
                  </div>
                )}
                {!isInputTypeParagraph(input) &&
                  (showDescription ? (
                    <div className="h-1 w-[3rem]" />
                  ) : (
                    <div className="ml-1 h-fit w-fit">
                      <AddTextEditorBtn
                        action={() => setShowDescription(true)}
                      />
                    </div>
                  ))}
              </div>

              <div className="mb-auto mt-2 w-[23rem]">
                <SelectFieldControler
                  name="type"
                  defaultValue={type}
                  options={dataSelectOptions}
                  onChangeAction={(name, value) => {
                    handleEditType(value as InputType);
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:gap-10">
              <div className="min-w-0 md:flex-1">
                {!isInputTypeParagraph(input) && showDescription && (
                  <EditFormDescriptionEditor
                    setDescription={setDescription}
                    isDescription={showDescription}
                    variant="input"
                    onClose={() => setShowDescription(false)}
                  />
                )}
                {isInputWithOptions(input) && (
                  <AddOption
                    inputIdx={inputIdx}
                    input={input}
                    header={header}
                  />
                )}
              </div>
              {!isInputTypeParagraph(input) && <ToggleInputs />}
            </div>
          </form>
        </FormProvider>
      )}
    </Card>
  );
};

export default EditFormInput;
