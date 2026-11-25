"use client";

import { editInputLabelAction } from "@/actions/edit-form/edit-form-input/editInputLabelAction";
import { editInputTypeAction } from "@/actions/edit-form/edit-form-input/editInputTypeAction";
import { Card, InputFields, SelectFieldController } from "@/components/shared";
import { useInputData } from "@/context/InputDataContextProvider";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useFormData } from "@/context/FormDataContextProvider";
import { InputData, InputType } from "@/enums";
import {
  canInputHaveAcceptedValues,
  isInputTypeParagraph,
  isInputWithOptions,
} from "@/helpers/inputHelpers";
import { useEditForm } from "@/hooks/useEditForm";
import { consumeFocusOnLastEditField } from "@/lib/edit-form-focus";
import {
  editInputFormSchema,
  EditInputFormSchema,
} from "@/lib/zod-schema/edit-form-schemas/editFormInputSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { dataSelectOptions } from "../editFormData";
import AddOption from "./AddOption";
import FormInputMoveRemoveButtons from "./FormInputMoveRemoveButtons";
import ToggleInputs from "./toggle-inputs/ToggleInputs";
import AcceptedValuesSection from "../accepted-values/AcceptedValuesSection";
import AddTextEditorBtn from "../AddTextEditorBtn";
import EditFormDescriptionEditor from "./EditFormDescriptionEditor";
import InputFieldHeader from "./InputFieldHeader";

const dataInputLabel: InputData[] = [
  {
    name: "header",
    placeholder: "Pytanie",
    label: `Pytanie`,
    type: InputType.TEXT,
  },
];

const EditFormInput = () => {
  const { formId, input, inputIdx, inputNumber, isLastInput } = useInputData();
  const focusRegionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLastInput || !consumeFocusOnLastEditField(formId)) return;
    focusRegionRef.current?.focus({ preventScroll: false });
  }, [formId, isLastInput]);

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

  useAutoLoader(isPending);
  const isAnyLoading = [...Object.values(isLoadingLabel ?? {})].some(Boolean);
  useAutoLoader(isAnyLoading, "small");
  const formData = useFormData();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (!header) setError("header", { message: "Uzupełnij pytanie" });
  }, [header, setError, formData]);

  return (
    <Card className="bg-white" id={inputNumber}>
      {!inputId ? (
        <div>Błąd pola fomrularza, skontanktuj się z administratorem</div>
      ) : (
        <FormProvider {...methods}>
          <div
            ref={focusRegionRef}
            tabIndex={-1}
            className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label={inputNumber != null ? `Pytanie` : "Pole formularza"}
          >
            <form>
              <InputFieldHeader
                inputNumber={inputNumber}
                type={type}
                formId={formId}
                inputId={inputId}
              />
              <div className="">
                {!isInputTypeParagraph(input) && (
                  <div className="mb-4">
                    <InputFields
                      inputsData={dataInputLabel}
                      register={register}
                      errorMsg={errors.header as any}
                      onChange={handleEditLabel}
                    />
                  </div>
                )}

                {isInputTypeParagraph(input) && (
                  <EditFormDescriptionEditor
                    setDescription={setDescription}
                    isDescription={showDescription}
                    variant="input"
                    onClose={() => setShowDescription(false)}
                  />
                )}
              </div>
              <div
                className={` ${showDescription ? "block" : "flex flex-wrap items-center gap-4"}`}
              >
                {!isInputTypeParagraph(input) && !showDescription && (
                  <AddTextEditorBtn action={() => setShowDescription(true)} />
                )}

                {!isInputTypeParagraph(input) && showDescription && (
                  <div className="mb-8">
                    <EditFormDescriptionEditor
                      setDescription={setDescription}
                      isDescription={showDescription}
                      variant="input"
                      onClose={() => setShowDescription(false)}
                    />
                  </div>
                )}

                {canInputHaveAcceptedValues(input) && <AcceptedValuesSection />}
              </div>
              <div className="mr-[2.7rem] md:flex md:gap-10">
                <div className="min-w-0 md:flex-1">
                  {isInputWithOptions(input) && (
                    <AddOption
                      inputIdx={inputIdx}
                      input={input}
                      header={header}
                    />
                  )}
                </div>
              </div>{" "}
              {!isInputTypeParagraph(input) && <ToggleInputs />}
            </form>
          </div>
        </FormProvider>
      )}
    </Card>
  );
};

export default EditFormInput;
