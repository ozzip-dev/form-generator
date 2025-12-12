"use client";

import { createProtocolAction } from "@/actions/protocol/createProtocol.Action";
import { Button, CheckboxGroupField, InputFields } from "@/components/shared";
import { OPTION_OTHER } from "@/helpers/inputHelpers";
import {
  ProtocolFormSchema,
  protocolFormSchema,
} from "@/lib/zodSchema/editFormSchemas/protocolFormSchema";
import { Protocol } from "@/types/protocol";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// TODO: gdy dojdziemy do ładu i składu:
// 1. wywalić pozostałe formy: ...M i ...K
// 2. usunąć zbędny kod tutaj
// 3. naprawic zod dla protocol form

const dataInputsProtocolForm = [
  {
    label: "Data rozpoczęcia sporu zbiorowego",
    name: "disputeStartDate",
    type: "date",
  },
  {
    label: "Branża",
    name: "branch",
    placeholder: "Budownictwo",
    type: "text",
  },
  {
    label: "Nazwa związku",
    name: "tradeUnionName",
    placeholder: "Solimarność",
    type: "text",
  },
  {
    label: "Nazwa przedsiębiorstwa",
    name: "workplaceName",
    placeholder: "firma",
    type: "text",
  },
];

const dataCheckboxOptions = [
  {
    checkboxLabel: "Czas pracy",
    name: "workTime",
  },
  {
    checkboxLabel: "Warunki BHP",
    name: "safetyConditions",
  },
  {
    checkboxLabel: "Wysokość płac",
    name: "wages",
  },
  {
    checkboxLabel: "Normy pracy",
    name: "workStandards",
  },
  {
    checkboxLabel: "Inne",
    name: OPTION_OTHER,
    optionId: OPTION_OTHER,
  },
];

type Props = {
  handlePrintForm?: () => void;
  protocol?: Partial<Protocol>;
  onSubmit: (data: any) => Promise<void>;
};

const ProtocolForm = (props: Props) => {
  const defaultValues = {
    branch: props.protocol?.branch ?? "",
    disputeStartDate: props.protocol?.disputeStartDate
      ? new Date(props.protocol.disputeStartDate).toISOString().split("T")[0]
      : "",
    tradeUnionName: props.protocol?.tradeUnionName ?? "",
    workplaceName: props.protocol?.workplaceName ?? "",
    disputeReason: props.protocol?.disputeReason ?? {
      workTime: "",
      safetyConditions: "",
      wages: "",
      workStandards: "",
      [OPTION_OTHER]: "",
    },
  };

  const methods = useForm<any>({
    resolver: zodResolver(protocolFormSchema),
    defaultValues,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    console.log("FORM VALUES", methods.getValues());
  }, [methods.watch()]);

  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          await props.onSubmit(data);
        })}
      >
        <InputFields inputsData={dataInputsProtocolForm} register={register} />
        <CheckboxGroupField
          groupLabel="Przyczyna rozpoczęcia sporu"
          control={control}
          name="disputeReason"
          options={dataCheckboxOptions}
        />

        <Button message="Zapisz" isLoading={isSubmitting} />
      </form>
      {props.handlePrintForm && (
        <Button
          type="button"
          message="Anuluj"
          onClickAction={props.handlePrintForm}
        />
      )}
    </>
  );
};

export default ProtocolForm;

// const ProtocolForm = (props: Props) => {
//   const {
//     branch,
//     disputeReason,
//     disputeStartDate,
//     tradeUnionName,
//     lastModifiedAt,
//     uploadedAt,
//     workplaceName,
//   } = props.protocol;

//   const defaultValues = { branch, workplaceName, disputeStartDate };

//   const methods = useForm<ProtocolFormSchema>({
//     resolver: zodResolver(protocolFormSchema),
//     defaultValues: defaultValues,
//     mode: "all",
//   });

//   const {
//     register,
//     formState: { errors, isSubmitting },
//     trigger,
//     setError,
//     control,
//     reset,
//     handleSubmit,
//     setValue,
//     getValues,
//   } = methods;

//   useEffect(() => {
//     console.log("FORM VALUES", methods.getValues());
//   }, [methods.watch()]);

//   const onSubmit = async (data: ProtocolFormSchema) => {
//     const {
//       branch,
//       tradeUnionName,
//       workplaceName,
//       disputeStartDate,
//       disputeReason,
//     } = data;

//     const disputeReasonValues = Object.values(disputeReason).filter(
//       (string) => string !== ""
//     );

//     await createProtocolAction({
//       branch,
//       disputeReason: disputeReasonValues,
//       tradeUnionName,
//       workplaceName,
//       disputeStartDate: disputeStartDate as string,
//     });

//     try {
//       reset();
//     } catch (err) {}
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)} className="w-4/5 m-auto">
//         <InputFields
//           inputsData={dataInputsProtocolForm}
//           register={register}
//           errorMsg={errors}
//         />

//         <CheckboxGroupField
//           groupLabel="Przyczyna rozpoczęcia sporu"
//           control={control!}
//           name="disputeReason"
//           options={dataCheckboxOptions}
//         />

//         <div className="w-fit ml-auto">
//           <Button
//             message="Zapisz dane dotyczące sporu zbiorowego"
//             isLoading={isSubmitting}
//           />
//         </div>
//       </form>
//       <div>
//         {props.handlePrintForm && (
//           <Button
//             message="Anuluj"
//             type="button"
//             onClickAction={props.handlePrintForm}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// const ProtocolForm = ({ protocol, handlePrintForm }: Props) => {
//   const methods = useForm<ProtocolFormSchema>({
//     resolver: zodResolver(protocolFormSchema),
//     defaultValues: {
//       branch: protocol?.branch ?? "",
//       disputeStartDate: protocol?.disputeStartDate
//         ? new Date(protocol.disputeStartDate).toISOString().split("T")[0]
//         : "",
//       tradeUnionName: protocol?.tradeUnionName ?? "",
//       workplaceName: protocol?.workplaceName ?? "",
//       // disputeReason: protocol?.disputeReason ?? [],
//     },
//   });

//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = async (data: ProtocolFormSchema) => {
//     // const cleanReasons = data.disputeReason.filter((s:any) => s !== "");

//     //   await createProtocolAction({
//     //     ...data,
//     //     disputeReason: cleanReasons,
//     //   });
//     // };

//     return (
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <InputFields inputsData={dataInputsProtocolForm} register={register} />

//         {/* <CheckboxGroupField
//         groupLabel="Przyczyna rozpoczęcia sporu"
//         control={control}
//         name="disputeReason"
//         options={dataCheckboxOptions}
//       /> */}

//         <Button message="Zapisz" isLoading={isSubmitting} />

//         {handlePrintForm && (
//           <Button
//             type="button"
//             message="Anuluj"
//             onClickAction={handlePrintForm}
//           />
//         )}
//       </form>
//     );
//   };
// };

// export default ProtocolForm;
