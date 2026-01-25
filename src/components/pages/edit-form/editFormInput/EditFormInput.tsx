"use client";

import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
import { editInputTypeAction } from "@/actions/edit-form/editFormInput/editInputTypeAction";
import { Button, Icon, InputFields } from "@/components/shared";
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
import { useEffect, useMemo, useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { dataSelectOptions } from "../editFormData";
import AddOption from "./AddOption";
import EditFormDescriptionInput from "./EditFormDescriptionInput";
import InputDataToggleSwitch from "./toggle-inputs/InputDataToggleSwitch";
import { toggleUniqueAction } from "@/actions/edit-form/editFormInput/toggleUniqueAction";
import { toggleRequiredAction } from "@/actions/edit-form/editFormInput/toggleRequiredAction";
import FormInputMoveRemoveButtons from "./FormInputMoveRemoveButtons";
import { useSearchParams, useRouter } from "next/navigation";
import { useInputData } from "@/context/InputDataContextProvider";
import ToggleInputs from "./toggle-inputs/ToggleInputs";


const dataInputLabel = [
  {
    type: "text",
    name: `header`,
    placeholder: "Pytanie",
    floatingLabel: "Edytuj pytanie",
  },
];



const EditFormInput = () => {
  const { formId, input, inputIdx } = useInputData()

  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    id: inputId,
    required,
    order,
    type,
    header,
    description,
    options,
    unique,
  } = input;

  const [isPending, startTransition] = useTransition();

  const newInputId = searchParams.get('newInputId');
  const isNewlyAdded = newInputId === inputId;
  const isParagraph = isInputTypeParagraph(input);

  const [isDescription, setDescription] = useState(!!description);

  const [isEditor, setEditor] = useState(isNewlyAdded && isParagraph);


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

  const printDescriptionInput = () => {
    setDescription(true);
    setEditor(true)
  }

  useAutoLoader(isPending);
  const isAnyLoading = [...Object.values(isLoadingLabel ?? {})].some(Boolean);
  useAutoLoader(isAnyLoading, "small");


  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (isNewlyAdded) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('newInputId');
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [isNewlyAdded, searchParams, router]);

  const canShowAddDescriptionBtn =
    !isInputTypeParagraph(input) && !isDescription;

  return (
    <Card className="">
      {!inputId ? (
        <div>Błąd pola fomrularza, skontankuj się z administratorem</div>
      ) : (
        <FormProvider {...methods}>
          <form>
            <FormInputMoveRemoveButtons />

            <div className="md:flex items-center md:gap-10">

              <div className="flex flex-1 items-center">
                {!isInputTypeParagraph(input) && (
                  <div className="w-full">
                    <InputFields
                      inputsData={dataInputLabel}
                      register={register}
                      errorMsg={errors.header as any}
                      onChange={handleEditLabel}
                    />
                  </div>
                )}
                {!isInputTypeParagraph(input) && (
                  isDescription ? (
                    <div className="w-[2rem] h-1" />
                  ) : (
                    <div className="w-fit h-fit ml-1">
                      <Button
                        variant="ghost"
                        className="!rounded-full border border-accent p-[0.2rem] ml-2"
                        icon={
                          <Icon
                            icon="plus-solid-full"
                            size={12}
                            color="var(--color-accent)"
                          />
                        }
                        onClickAction={printDescriptionInput}
                      />
                    </div>
                  )
                )}
              </div>


              <div className="w-[23rem] md:pt-[1.7rem] lg:pt-0">
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


              <div className="md:flex-1">

                <EditFormDescriptionInput
                  // description={description ?? ""}
                  setEditor={setEditor}
                  setDescription={setDescription}
                  isEditor={isEditor}
                  isDescription={isDescription}
                />


                {isInputWithOptions(input) && (
                  <AddOption
                    inputIdx={inputIdx}
                    input={input}
                    header={header}
                  />
                )}
              </div>

              {!isInputTypeParagraph(input) && (
                <ToggleInputs />
              )}
            </div>
          </form>
        </FormProvider>
      )}
    </Card>
  );
};

export default EditFormInput;


