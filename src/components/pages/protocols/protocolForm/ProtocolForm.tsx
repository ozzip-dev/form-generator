"use client";

import { createProtocolAction } from "@/actions/protocol/createProtocol.Action";
import { Button, CheckboxGroupField, InputFields } from "@/components/shared";
import { OPTION_OTHER } from "@/helpers/inputHelpers";
import {
  ProtocolFormSchema,
  protocolFormSchema,
} from "@/lib/zodSchema/editFormSchemas/protocolFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// branza
// data rozpoczecia sporu
// nazwa związku
// nazwa zakładu
// powod sporu moze byc kilka :  czas pracy, standardy bhp, wysokoć płac, normy pracy, inne

// rządania wszynające spór zbiorowy - ladowanie plikow
// rokowania - ladowanie plików: protokoły ze spotkań, ladowanie plików: główny protokul rozbierzności, inne
// mediacje - ladowanie plików: protokoły ze spotkań, ladowanie plików: główny protokul rozbierzności, inne
// porozumienie kończące spór
// inne - ladowanie likow

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

const ProtocolForm = () => {
  const methods = useForm<ProtocolFormSchema>({
    resolver: zodResolver(protocolFormSchema),
    mode: "all",
  });

  const {
    register,
    formState: { errors, isSubmitting },
    trigger,
    setError,
    control,
    reset,
    handleSubmit,
    setValue,
    getValues,
  } = methods;

  useEffect(() => {
    console.log("FORM VALUES", methods.getValues());
  }, [methods.watch()]);

  const onSubmit = async (data: ProtocolFormSchema) => {
    const {
      branch,
      tradeUnionName,
      workplaceName,
      disputeStartDate,
      disputeReason,
    } = data;

    const disputeReasonValues = Object.values(disputeReason).filter(
      (string) => string !== ""
    );

    await createProtocolAction({
      branch,
      disputeReason: disputeReasonValues,
      tradeUnionName,
      workplaceName,
      disputeStartDate: disputeStartDate as string,
    });

    try {
      reset();
    } catch (err) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-4/5 m-auto">
      <div className="text-[30px] font-black">Krok 1: uzupełnij dane</div>
      <InputFields
        inputsData={dataInputsProtocolForm}
        register={register}
        errorMsg={errors}
      />

      <CheckboxGroupField
        groupLabel="Przyczyna rozpoczęcia sporu"
        control={control!}
        name="disputeReason"
        options={dataCheckboxOptions}
      />

      <div className="w-fit ml-auto">
        <Button
          message="Zapisz dane dotyczące sporu zbiorowego"
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProtocolForm;
