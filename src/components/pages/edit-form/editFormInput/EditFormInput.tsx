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
import InputDataToggleSwitch from "./InputDataToggleSwitch";
import { toggleUniqueAction } from "@/actions/edit-form/editFormInput/toggleUniqueAction";
import { toggleRequiredAction } from "@/actions/edit-form/editFormInput/toggleRequiredAction";
import FormInputMoveRemoveButtons from "./FormInputMoveRemoveButtons";
import { useSearchParams, useRouter } from "next/navigation";

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
  } = props.input;

  const [isPending, startTransition] = useTransition();

  const newInputId = searchParams.get('newInputId');
  const isNewlyAdded = newInputId === inputId;
  const isParagraph = isInputTypeParagraph(props.input);

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
    !isInputTypeParagraph(props.input) && !isDescription;

  return (
    <Card className="">
      {!inputId ? (
        <div>Błąd pola fomrularza, skontankuj się z administratorem</div>
      ) : (
        <FormProvider {...methods}>
          <form>
            <FormInputMoveRemoveButtons
              {...{
                inputId,
                isFirstInput: order == 0,
                isLastInput: props.isLastInput,
                setDescription,
                setEditor,
                isDescription
              }}
            />

            <div className="md:flex items-center md:gap-10">

              <div className="flex flex-1 items-center">
                {!isInputTypeParagraph(props.input) && (
                  <div className="w-full">
                    <InputFields
                      inputsData={dataInputLabel}
                      register={register}
                      errorMsg={errors.header as any}
                      onChange={handleEditLabel}
                    />
                  </div>
                )}
                {!isInputTypeParagraph(props.input) && (
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
              <div className="w-[23rem]">
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
                  formId={formId}
                  inputId={inputId as string}
                  inputIdx={props.inputIdx}
                  description={description ?? ""}
                  isParagraph={isInputTypeParagraph(props.input)}
                  setEditor={setEditor}
                  setDescription={setDescription}
                  isEditor={isEditor}
                  isDescription={isDescription}
                />


                {isInputWithOptions(props.input) && (
                  <AddOption
                    inputIdx={props.inputIdx}
                    input={props.input}
                    header={header}
                  />
                )}
              </div>



              {!isInputTypeParagraph(props.input) && (
                <div className="flex flex-col gap-4 md:w-[23rem] md:ml-auto">
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


// "use client";

// import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
// import { editInputTypeAction } from "@/actions/edit-form/editFormInput/editInputTypeAction";
// import { Button, Icon, InputFields } from "@/components/shared";
// import Card from "@/components/shared/Card";
// import { SelectFieldControler } from "@/components/shared/inputs/selectField/SelectFieldController";
// import { useAutoLoader } from "@/context/LoaderContextProvider";
// import { InputType } from "@/enums";
// import {
//   isInputTypeParagraph,
//   isInputWithOptions,
// } from "@/helpers/inputHelpers";
// import { useEditForm } from "@/hooks/useEditForm";
// import { useSafeURLParam } from "@/hooks/useSafeURLParam";
// import {
//   editInputFormSchema,
//   EditInputFormSchema,
// } from "@/lib/zodSchema/editFormSchemas/editFormInputSchema";
// import { FormInput } from "@/types/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useMemo, useState, useTransition } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import { dataSelectOptions } from "../editFormData";
// import AddOption from "./AddOption";
// import EditFormDescriptionInput from "./EditFormDescriptionInput";
// import InputDataToggleSwitch from "./InputDataToggleSwitch";
// import { toggleUniqueAction } from "@/actions/edit-form/editFormInput/toggleUniqueAction";
// import { toggleRequiredAction } from "@/actions/edit-form/editFormInput/toggleRequiredAction";
// import FormInputMoveRemoveButtons from "./FormInputMoveRemoveButtons";
// import { addFormFieldAction } from "@/actions/edit-form/addFormFieldAction";

// type Props = {
//   input: FormInput;
//   inputIdx: number;
//   isLastInput: boolean;
//   autoSave?: boolean; // 👈 TRYB DZIAŁANIA
// };

// const EditFormInput = ({
//   input,
//   inputIdx,
//   isLastInput,
//   autoSave = true,
// }: Props) => {
//   const formId = useSafeURLParam("formId");

//   const {
//     id: inputId,
//     required,
//     order,
//     type,
//     header,
//     description,
//     options,
//     unique,
//   } = input;

//   const isParagraph = isInputTypeParagraph(input);

//   const [isPending, startTransition] = useTransition();
//   const [isDescription, setDescription] = useState(!!description);
//   const [isEditor, setEditor] = useState(false);

//   const defaultValues = useMemo(
//     () => ({
//       header: header ?? "",
//     description: description ?? "",
//     options: options ?? [],
//     required: required ?? false,
//     unique: unique ?? false,
//     type
//     }),
//     [header, description, options, required, unique, type]
//   );

//   const methods = useForm<EditInputFormSchema>({
//     // resolver: zodResolver(editInputFormSchema),
//     defaultValues,
//     mode: "all",
//   });

//   const {
//     register,
//     reset,
//     formState: { errors },
//     trigger,
//     setError,
//     handleSubmit,
//   } = methods;

//   const { handleEdit: handleEditLabel, isLoading: isLoadingLabel } =
//     useEditForm({
//       formId,
//       inputId,
//       inputIdx,
//       trigger,
//       action: editInputLabelAction,
//       mode: "inputLabel",
//       setError,
//     });

//   const isAnyLoading = [...Object.values(isLoadingLabel ?? {})].some(Boolean);

//   useAutoLoader(isPending || isAnyLoading, "small");

//   useEffect(() => {
//     reset(defaultValues);
//   }, [defaultValues, reset]);


//   const onSubmit = async (data: EditInputFormSchema) => {

//     console.log('////////',data)
//     if (!formId || !inputId) return;

//     startTransition(async () => {
//       await addFormFieldAction(formId,  {
//         ...data,
//         type: data.type as InputType,
//         validation: {},
//         options: [],
//       });
//     });
//   };

//   const handleEditType = (type: InputType) => {
//     startTransition(async () => {
//       if (!formId || !inputId) return;
//       await editInputTypeAction(formId, inputId, type);
//     });
//   };

// console.log('!autoSave',autoSave)

//   return (
//     <Card>
//       <FormProvider {...methods}>
//         <form onSubmit={!autoSave ? handleSubmit(onSubmit) : undefined}>
//           {/* <FormInputMoveRemoveButtons
//             {...{
//               inputId,
//               isFirstInput: order === 0,
//               isLastInput,
//               setDescription,
//               setEditor,
//               isDescription,
//             }}
//           /> */}

//           <div className="md:flex md:gap-10">
//             <div className="flex flex-1">
//               {!isParagraph && (
//                 <div className="w-full">
//                   <InputFields
//                     inputsData={[
//                       {
//                         type: "text",
//                         name: "header",
//                         placeholder: "Pytanie",
//                         floatingLabel: "Edytuj pytanie",
//                       },
//                     ]}
//                     register={register}
//                     errorMsg={errors.header as any}
//                     onChange={autoSave ? handleEditLabel : undefined}
//                   />
//                 </div>
//               )}

//               {!isParagraph && !isDescription && (
//                 <div className="w-fit h-fit mt-3 ml-1">
//                   <Button
//                     variant="ghost"
//                     className="!rounded-full border border-accent p-[0.2rem]"
//                     icon={
//                       <Icon
//                         icon="plus-solid-full"
//                         size={12}
//                         color="var(--color-accent)"
//                       />
//                     }
//                     onClickAction={() => {
//                       setDescription(true);
//                       setEditor(true);
//                     }}
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="w-[23rem] mb-8">
//               <SelectFieldControler
//                 name="type"
//                 defaultValue={type}
//                 options={dataSelectOptions}
//                 onChangeAction={(name, value) =>
//                   handleEditType(value as InputType)
//                 }
//               />
//             </div>
//           </div>

//           <EditFormDescriptionInput
//             formId={formId}
//             inputId={inputId!}
//             inputIdx={inputIdx}
//             description={description ?? ""}
//             isParagraph={isParagraph}
//             setEditor={setEditor}
//             setDescription={setDescription}
//             isEditor={isEditor}
//             isDescription={isDescription}
//           />

//           {isInputWithOptions(input) && (
//             <AddOption
//               inputIdx={inputIdx}
//               input={input}
//               header={header}
//             />
//           )}

//           {!isParagraph && (
//             <div className="flex flex-col gap-4 md:w-[23rem] md:ml-auto">
//               {[
//                 {
//                   name: "required",
//                   label: "Odpowiedź wymagana",
//                   infoText:
//                     "Bez wypełnienia pola formularz nie zostanie wysłany",
//                   action: toggleRequiredAction,
//                 },
//                 {
//                   name: "unique",
//                   label: "Odpowiedź unikalna",
//                   infoText:
//                     "Dana odpowiedź będzie mogła zostać wysłana tylko jeden raz",
//                   action: toggleUniqueAction,
//                 },
//               ].map((props, idx) => (
//                 <InputDataToggleSwitch
//                   key={idx}
//                   formId={formId as string}
//                   input={input}
//                   {...props}
//                 />
//               ))}
//             </div>
//           )}


//           {!autoSave && (
//             <div className="flex justify-end mt-6">
//               <Button type="submit" message="Zapisz zmiany" />
//             </div>
//           )}
//         </form>
//       </FormProvider>
//     </Card>
//   );
// };

// export default EditFormInput;
