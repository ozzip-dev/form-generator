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
import SectionHeader from "@/components/shared/SectionHeader";

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
    placeholder: "Firma",
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
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <SectionHeader message="Dane sporu zbiorowego" />
        <InputFields
          inputsData={dataInputsProtocolForm}
          register={register}
          errorMsg={errors}
          variant="horizontal"
          isSubmiting={isSubmitting}
        />

        <div className="md:mt-[2.7rem]">
          <CheckboxGroupField
            groupLabel="Przyczyna rozpoczęcia sporu:"
            control={control}
            name="disputeReason"
            options={dataCheckboxOptions}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center mt-10 gap-10 sm:gap-16">
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
