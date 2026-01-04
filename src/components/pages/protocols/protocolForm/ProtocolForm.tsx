"use client";

import { Button, CheckboxGroupField, InputFields } from "@/components/shared";
import { OPTION_OTHER } from "@/helpers/inputHelpers";
import {
  protocolFormSchema,
  ProtocolFormSchema,
} from "@/lib/zodSchema/protocolFormSchema";
import { ProtocolInsertData, ProtocolSerialized } from "@/types/protocol";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormSetError } from "react-hook-form";
import { getProtocolDefaultValues } from "./getProtocolDefaultValues";
import { useToast } from "@/context/ToastProvider";
import Card from "@/components/shared/Card";

const dataInputsProtocolForm = [
  {
    staticLabel: "Data rozpoczęcia sporu:",
    name: "disputeStartDate",
    type: "date",
  },
  {
    staticLabel: "Branża:",
    name: "branch",
    placeholder: "Budownictwo",
    type: "text",
  },
  {
    staticLabel: "Nazwa związku:",
    name: "tradeUnionName",
    placeholder: "Związek",
    type: "text",
  },
  {
    staticLabel: "Nazwa przedsiębiorstwa:",
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
    checkboxLabel: "Inna",
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
  const { toast } = useToast();

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

  const onFormSubmit = async (data: ProtocolInsertData) => {
    try {
      await props.onSubmit(data, setError);
      toast({
        title: "Sukces",
        description: "Protokół wyedytowany",
        variant: "success",
      });
    } catch (e) {
      console.log(1);
      toast({
        title: "Błąd edycji protokołu",
        description: "Coś poszło nie tak",
        variant: "error",
      });
    } finally {
      props.handlePrintForm?.();
    }
  };

  return (
    <Card>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="text-lg font-bold  mb-6">Dane sporu zbiorowego</div>
        <InputFields
          inputsData={dataInputsProtocolForm}
          register={register}
          errorMsg={errors}
          variant="horizontal"
        />
        <div className="mt-6">
          <CheckboxGroupField
            groupLabel="Przyczyna rozpoczęcia sporu:"
            control={control}
            name="disputeReason"
            options={dataCheckboxOptions}
          />
        </div>

        <div className="flex justify-center  gap-16">
          {props.handlePrintForm && (
            <Button
              type="button"
              message="Anuluj"
              onClickAction={props.handlePrintForm}
            />
          )}

          <Button message="Zapisz" isLoading={isSubmitting} />
        </div>
      </form>
    </Card>
  );
};

export default ProtocolForm;
