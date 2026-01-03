"use client";

import { FormInput } from "@/types/input";
import { FormProvider, useForm } from "react-hook-form";

import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
import { editInputTypeAction } from "@/actions/edit-form/editFormInput/editInputTypeAction";
import UniqueToggleSwitch from "@/components/pages/edit-form/editFormInput/UniqueToggleSwitch";
import { InputFields } from "@/components/shared";
import { SelectFieldControler } from "@/components/shared/inputs/selectField/SelectFieldController";
import { InputType } from "@/enums";
import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import {
  editInputFormSchema,
  EditInputFormSchema,
} from "@/lib/zodSchema/editFormSchemas/editFormInputSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useMemo } from "react";
import { dataSelectOptions } from "../editFormData";
import AddOption from "./AddOption";
import EditFormDescriptionInput from "./EditFormDescriptionInput";
import MoveInputDownBtn from "./MoveInputDownBtn";
import MoveInputUpBtn from "./MoveInputUpBtn";
import RemoveInputBtn from "./RemoveInputBtn";
import RequiredToggleSwitch from "./RequiredToggleSwitch";
import {
  isInputTypeParagraph,
  isInputWithOptions,
} from "@/helpers/inputHelpers";
import Card from "@/components/shared/Card";

const dataInputLabel = [
  {
    type: "text",
    name: `header`,
    placeholder: "Pytanie",
    label: "Edytuj pytanie",
  },
];

const dataInputTextarea = [
  {
    name: `description`,
    placeholder: "Opis",
    label: "Edytuj opis",
    type: "textarea",
  },
];

type Props = {
  input: FormInput;
  inputIdx: number;
  isLastInput: boolean;
};

const EditFormInput = (props: Props) => {
  const formId = useSafeURLParam("formId");

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
    [header, description, options, required, unique, type]
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
    watch,
  } = methods;

  // useEffect(() => {
  //   console.log("FORM VALUES", methods.getValues());
  // }, [methods.watch()]);

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

  const [_, editType, isPending] = useActionState<null, InputType>(
    async (_state, type) => {
      if (!formId || !props.input.id) return null;
      await editInputTypeAction(formId, props.input.id, type);
      return null;
    },
    null
  );

  const handleEditType = (type: InputType) => {
    startTransition(() => {
      editType(type);
    });
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const isAnyLoading = [...Object.values(isLoadingLabel ?? {})].some(Boolean);

  return (
    <Card>
      <FormProvider {...methods}>
        <form className="flex justify-between">
          <div className="w-2/3 flex flex-col gap-16">
            <div className="flex justify-between">
              <div className="w-3/6 ">
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
              <div>
                <SelectFieldControler
                  name={`type`}
                  defaultValue={type}
                  options={dataSelectOptions}
                  onChangeAction={(name, value) => {
                    handleEditType(value as InputType);
                  }}
                />
              </div>
            </div>
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
          </div>

          <div className="flex flex-col gap-14">
            <div className="flex gap-8 mb-14 h-fit">
              <div className="ml-auto flex gap-4">
                {order > 0 && <MoveInputUpBtn inputId={inputId as string} />}
                {!props.isLastInput && (
                  <MoveInputDownBtn inputId={inputId as string} />
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex-1 w-px  bg-font_light" />
              </div>

              <div className="mb-auto">
                <RemoveInputBtn inputId={inputId as string} />
              </div>
            </div>

            {!isInputTypeParagraph(props.input) && (
              <div className="flex flex-col gap-6">
                <RequiredToggleSwitch input={props.input} />
                <UniqueToggleSwitch input={props.input} />
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};

export default EditFormInput;
