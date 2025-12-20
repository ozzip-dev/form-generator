"use client";

import { FormInput } from "@/types/input";
import { FormProvider, useForm } from "react-hook-form";

import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
import { editInputTypeAction } from "@/actions/edit-form/editFormInput/editInputTypeAction";
import { FullscreenLoader, InputFields } from "@/components/shared";
import UniqueToggleSwitch from "@/components/pages/edit-form/editFormInput/UniqueToggleSwitch";
import { SelectFieldControler } from "@/components/shared/inputs/selectField/SelectFieldController";
import { useEditForm } from "@/hooks/useEditForm";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import {
  editInputFormSchema,
  EditInputFormSchema,
} from "@/lib/zodSchema/editFormSchemas/editFormInputSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import AddOption from "./AddOption";
import EditFormDescriptionInput from "./EditFormDescriptionInput";
import MoveInputDownBtn from "./MoveInputDownBtn";
import MoveInputUpBtn from "./MoveInputUpBtn";
import RemoveInputBtn from "./RemoveInputBtn";
import RequiredToggleSwitch from "./RequiredToggleSwitch";
import { startTransition, useActionState } from "react";
import { InputType } from "@/enums";

const dataSelectOptions = [
  { label: "Odpowiedź krótka", value: "text" },
  { label: "Odpowiedź długa", value: "superText" },
  { label: "Email", value: "email" },
  { label: "Data", value: "date" },
  { label: "Numer", value: "number" },
  { label: "Wybór pojedynczy", value: "singleSelect" },
  { label: "Wybór wielokrotny", value: "checkbox" },
];

const dataInputLabel = [
  {
    type: "text",
    name: `header`,
    placeholder: "Pytanie",
    label: "Edytuj pytanie",
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
    <FormProvider {...methods}>
      <form className="mb-3 rounded-md shadow-default  border border-default">
        <div className="flex gap-2 items-center p-2">
          {/* {(isAnyLoading || isPending) && <FullscreenLoader />} */}
          <div className="w-3/5 flex">
            <div className="flex flex-col gap-2 mr-4 w-3/5">
              <InputFields
                inputsData={dataInputLabel}
                register={register}
                errorMsg={errors.header as any}
                onChange={handleEditLabel}
                // isLoading={isLoadingLabel}
              />

              <EditFormDescriptionInput
                inputId={inputId as string}
                inputIdx={props.inputIdx}
                description={description ?? ""}
              />
              {(type === "checkbox" || type === "singleSelect") && (
                <AddOption
                  inputIdx={props.inputIdx}
                  input={props.input}
                  header={header}
                />
              )}
            </div>

            <div className="w-1/2 flex justify-center">
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

          <div>
            <RequiredToggleSwitch input={props.input} />
            <UniqueToggleSwitch input={props.input} />
          </div>

          <div className="flex flex-col justify-center gap-2 mb-auto">
            <div className="">
              {order > 0 && <MoveInputUpBtn inputId={inputId as string} />}
              {!props.isLastInput && (
                <MoveInputDownBtn inputId={inputId as string} />
              )}
            </div>
          </div>

          <div className="mb-auto">
            <RemoveInputBtn inputId={inputId as string} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditFormInput;
