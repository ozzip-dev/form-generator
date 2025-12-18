"use client";

import { Button, CheckboxGroupField, InputFields } from "@/components/shared";
import { OPTION_OTHER } from "@/helpers/inputHelpers";
import {
  protocolFormSchema,
  ProtocolFormSchema,
} from "@/lib/zodSchema/protocolFormSchema";
import { ProtocolSerialized } from "@/types/protocol";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormSetError } from "react-hook-form";
import { getProtocolDefaultValues } from "./getProtocolDefaultValues";

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
    placeholder: "Związek",
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
  mode: "addProtocol" | "editProtocol";
  onSubmit: (
    data: ProtocolFormSchema,
    setError: UseFormSetError<ProtocolFormSchema>
  ) => Promise<void>;
  protocol?: Partial<ProtocolSerialized>;
  handlePrintForm?: () => void;
};

const ProtocolForm = (props: Props) => {
  if (props.mode === "editProtocol" && !props.protocol) {
    throw new Error("ProtocolForm: mode=editProtocol requires protocol");
  }

  const methods = useForm<ProtocolFormSchema>({
    resolver: zodResolver(protocolFormSchema),
    defaultValues: getProtocolDefaultValues(
      props.mode === "editProtocol" ? props.protocol : undefined
    ),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = methods;

  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          await props.onSubmit(data, setError);
        })}
      >
        <InputFields
          inputsData={dataInputsProtocolForm}
          register={register}
          errorMsg={errors}
        />
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
