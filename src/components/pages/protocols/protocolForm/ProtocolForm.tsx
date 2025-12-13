"use client";

import { createProtocolAction } from "@/actions/protocol/createProtocol.Action";
import { Button, CheckboxGroupField, InputFields } from "@/components/shared";
import { useProtocol } from "@/context/ProtocolContext";
import { OPTION_OTHER } from "@/helpers/inputHelpers";
import {
  ProtocolFormSchema,
  protocolFormSchema,
} from "@/lib/zodSchema/editFormSchemas/protocolFormSchema";
import { Protocol } from "@/types/protocol";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useEffect } from "react";
import { useForm } from "react-hook-form";

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
  onSubmit: (data: any) => Promise<void>;
};

const ProtocolForm = (props: Props) => {
  const { protocolPromise } = useProtocol();
  const protocol = use(protocolPromise);
  if (!protocol) {
    return <div>Nie znaleziono protokołu</div>;
  }

  const defaultValues = {
    branch: protocol?.branch ?? "",
    disputeStartDate: protocol?.disputeStartDate
      ? new Date(protocol.disputeStartDate).toISOString().split("T")[0]
      : "",
    tradeUnionName: protocol?.tradeUnionName ?? "",
    workplaceName: protocol?.workplaceName ?? "",
    disputeReason: protocol?.disputeReason ?? {
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
