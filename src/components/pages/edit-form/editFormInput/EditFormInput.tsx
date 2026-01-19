"use client";

import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
import { editInputTypeAction } from "@/actions/edit-form/editFormInput/editInputTypeAction";
import { InputFields } from "@/components/shared";
import Card from "@/components/shared/Card";
import { SelectFieldControler } from "@/components/shared/inputs/selectField/SelectFieldController";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { InputType } from "@/enums";
import {
  isInputTypeParagraph,
  isInputWithOptions,
} from "@/helpers/inputHelpers";
import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import {
  editInputFormSchema,
  EditInputFormSchema,
} from "@/lib/zodSchema/editFormSchemas/editFormInputSchema";
import { FormInput } from "@/types/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { dataSelectOptions } from "../editFormData";
import AddOption from "./AddOption";
import EditFormDescriptionInput from "./EditFormDescriptionInput";
import InputDataToggleSwitch from "./InputDataToggleSwitch";
import { toggleUniqueAction } from "@/actions/edit-form/editFormInput/toggleUniqueAction";
import { toggleRequiredAction } from "@/actions/edit-form/editFormInput/toggleRequiredAction";
import FormInputMoveRemoveButtons from "./FormInputMoveRemoveButtons";

const dataInputLabel = [
  {
    type: "text",
    name: `header`,
    placeholder: "Pytanie",
    floatingLabel: "Edytuj pytanie",
  },
];

const toggleSwitchesData = [
  {
    name: "required",
    label: `Odpowiedź wymagana`,
    infoText: "Bez wypełnienia pola formularz nie zostanie wysłany",
    action: toggleRequiredAction,
  },
  {
    name: "unique",
    label: `Odpowiedź unikalna`,
    infoText: "Dana odpowiedź będzie mogła zostać wysłana tylko jeden raz",
    action: toggleUniqueAction,
  },
];

type Props = {
  input: FormInput;
  inputIdx: number;
  isLastInput: boolean;
};

const EditFormInput = (props: Props) => {
  const formId = useSafeURLParam("formId");
  const [isPending, startTransition] = useTransition();

  const {
    id: inputId,
    required,
    order,
    type,
    header,
    description,
    options,
    unique,
  } = props.input;

  const defaultValues = useMemo(
    () => ({
      header,
      description,
      options,
      required,
      unique,
      type,
    }),
    [header, description, options, required, unique, type],
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
      inputIdx: props.inputIdx,
      trigger,
      action: editInputLabelAction,
      mode: "inputLabel",
      setError,
    });

  const handleEditType = (type: InputType) => {
    startTransition(async () => {
      if (!formId || !props.input.id) return;
      await editInputTypeAction(formId, props.input.id, type);
    });
  };

  useAutoLoader(isPending);
  const isAnyLoading = [...Object.values(isLoadingLabel ?? {})].some(Boolean);
  useAutoLoader(isAnyLoading, "small");

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Card>
      {!inputId ? (
        <div>Błąd pola fomrularza, skontankuj się z administratorem</div>
      ) : (
        <FormProvider {...methods}>
          <form>
            {/* 1st row */}
            <div className="md:flex md:intems-center">
              <FormInputMoveRemoveButtons
                {...{
                  inputId,
                  isFirstInput: order == 0,
                  isLastInput: props.isLastInput,
                }}
              />

              {/* inputs */}
              <div className="md:w-4/6 md:flex justify-between">
                <div className="md:w-[45%]">
                  {!isInputTypeParagraph(props.input) && (
                    <InputFields
                      inputsData={dataInputLabel}
                      register={register}
                      errorMsg={errors.header as any}
                      onChange={handleEditLabel}
                      // isLoading={isLoadingLabel}
                    />
                  )}
                </div>
                <div className="md:w-[45%] md:max-w-[22rem]">
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
            </div>

            {/* 2nd row */}
            <div className="relative">
              <EditFormDescriptionInput
                inputId={inputId as string}
                inputIdx={props.inputIdx}
                description={description ?? ""}
                isParagraph={isInputTypeParagraph(props.input)}
              />

              {isInputWithOptions(props.input) && (
                <AddOption
                  inputIdx={props.inputIdx}
                  input={props.input}
                  header={header}
                />
              )}

              {!isInputTypeParagraph(props.input) && (
                <div className="flex flex-col gap-4 lg:absolute top-0 right-0">
                  {toggleSwitchesData.map(
                    ({ name, label, action, infoText }, idx) => (
                      <InputDataToggleSwitch
                        formId={formId as string}
                        input={props.input}
                        {...{ action, label, name, infoText }}
                        key={idx}
                      />
                    ),
                  )}
                </div>
              )}
            </div>
          </form>
        </FormProvider>
      )}
    </Card>
  );
};

export default EditFormInput;
