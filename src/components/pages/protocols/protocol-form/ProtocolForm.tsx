"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CheckboxGroupField,
  InputFields,
} from "@/components/shared";
import { OPTION_OTHER } from "@/helpers/inputHelpers";
import {
  protocolFormSchema,
  ProtocolFormSchema,
} from "@/lib/zod-schema/protocolFormSchema";
import { ProtocolInsertData, ProtocolSerialized } from "@/types/protocol";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormSetError } from "react-hook-form";
import { getProtocolDefaultValues } from "./getProtocolDefaultValues";
import { useToast } from "@/context/ToastProvider";
import SectionHeader from "@/components/shared/SectionHeader";

const dataInputsProtocolForm = [
  {
    staticLabel: "Data rozpoczęcia sporu:",
    name: "disputeStartDate",
    type: "date",
    labelClassName: "w-[22rem] md:text-right",
  },
  {
    staticLabel: "Branża:",
    name: "branch",
    placeholder: "Budownictwo",
    type: "text",
    labelClassName: "w-[22rem] md:text-right",
  },
  {
    staticLabel: "Nazwa związku:",
    name: "tradeUnionName",
    placeholder: "Związek",
    type: "text",
    labelClassName: "w-[22rem] md:text-right",
  },
  {
    staticLabel: "Nazwa przedsiębiorstwa:",
    name: "workplaceName",
    placeholder: "Firma",
    type: "text",
    labelClassName: "w-[22rem] md:text-right",
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
    name: OPTION_OTHER,
    optionId: OPTION_OTHER,
  },
];

type Props = {
  mode: "addProtocol" | "editProtocol";
  onSubmit: (
    data: ProtocolFormSchema,
    setError: UseFormSetError<ProtocolFormSchema>,
  ) => Promise<void | string | undefined>;
  protocol?: Partial<ProtocolSerialized>;
  handlePrintForm?: () => void;
};

const ProtocolForm = (props: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  if (props.mode === "editProtocol" && !props.protocol) {
    throw new Error("ProtocolForm: mode=editProtocol requires protocol");
  }

  const methods = useForm<ProtocolFormSchema>({
    resolver: zodResolver(protocolFormSchema),
    defaultValues: getProtocolDefaultValues(
      props.mode === "editProtocol" ? props.protocol : undefined,
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
      const protocolId = await props.onSubmit(data, setError);
      if (protocolId) {
        router.push(`/protocols/${protocolId}`);
        toast({
          title: "Sukces",
          description: "Protokół dodany",
          variant: "success",
        });
      } else {
        toast({
          title: "Sukces",
          description: "Protokół wyedytowany",
          variant: "success",
        });
      }
    } catch (e) {
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
          isSubmitting={isSubmitting}
        />

        <div className="md:ml-[0.8rem] md:mt-[2.2rem]">
          <CheckboxGroupField
            groupLabel="Przyczyna rozpoczęcia sporu:"
            control={control}
            name="disputeReason"
            options={dataCheckboxOptions}
            isSubmitting={isSubmitting}
            mode="horizontal"
          />
        </div>

        <div className="mt-10 flex flex-col justify-center gap-10 sm:flex-row sm:gap-16">
          {props.handlePrintForm && (
            <Button
              type="button"
              message="Anuluj"
              onClickAction={props.handlePrintForm}
              variant="primary-rounded"
            />
          )}

          <Button
            message="Zapisz"
            isLoading={isSubmitting}
            variant="primary-rounded"
          />
        </div>
      </form>
    </Card>
  );
};

export default ProtocolForm;
