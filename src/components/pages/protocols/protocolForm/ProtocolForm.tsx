"use client"

import { Button, CheckboxGroupField, InputFields } from "@/components/shared";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProtocolFormSchema,
  protocolFormSchema,
} from "@/lib/zodSchema/editFormSchemas/protocolFormSchema";
import { useErrorBoundary } from "react-error-boundary";
import { ProtocolDisputeReason } from "@/types/protocol";
import { mapDisputeReason } from "../utils";
import { useState } from "react";
import { createProtocol } from "@/actions/protocol";

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
    label: "Czas pracy",
    name: "workTime",
    value: false,
  },
  {
    label: "Warunki BHP",
    name: "safetyConditions",
    value: false,
  },
  {
    label: "Wysokość płac",
    name: "wages",
    value: false,
  },
  {
    label: "Normy pracy",
    name: "workStandards",
    value: false,
  },
  {
    label: "Czas pracy",
    name: "other",
    value: false,
    optionId: "other",
  },
];

const disputeReasonOptions: { id: ProtocolDisputeReason, label: string }[] = [
  {
    id: 'workTime',
    label: mapDisputeReason['workTime']
  },
  {
    id: 'safety',
    label: mapDisputeReason['safety']
  },
  {
    id: 'wages',
    label: mapDisputeReason['wages']
  },
  {
    id: 'standards',
    label: mapDisputeReason['standards']
  },
  {
    id: 'other',
    label: mapDisputeReason['other']
  },
]

const ProtocolForm = () => {
  const [reasons, setReasons] = useState<ProtocolDisputeReason[]>([])

  const methods = useForm<ProtocolFormSchema>({
    resolver: zodResolver(protocolFormSchema),
    mode: "all",
  });
    // const methods = useForm()
  const {
    register,
    formState: { errors, isSubmitting },
    trigger,
    setError,
    control,
    reset,
    handleSubmit,
    setValue,
    getValues
  } = methods;

  const onSubmit = async (data: ProtocolFormSchema) => {
    const {
      branch,
      tradeUnionName,
      workplaceName,
      disputeStartDate        
    } = data

    await createProtocol({
      branch,
      disputeReason: reasons,
      tradeUnionName,
      workplaceName,
      disputeStartDate: disputeStartDate as string,
    })

    try {
      reset();
    } catch (err) {}
  };

  // TODO: delete after checkbox structure refactor
  const onDisputeReasonEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      setReasons([
        ...reasons, value as ProtocolDisputeReason
      ])
    } else {
      setReasons(reasons.filter((item) => item != value))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-4/5 m-auto">
      <div className="text-[30px] font-black">Krok 1: uzupełnij dane</div>
      <InputFields
        inputsData={dataInputsProtocolForm}
        register={register}
        errorMsg={errors}
        // onChange={handleEdit}
        // isLoading={isSubmitting}
      />
      {/* <CheckboxGroupField
        groupLabel={"Przyczyna rozpoczęcia sporu"}
        name="barganingReason"
        options={dataCheckboxOptions}
        control={control}
        errorMsg={errors}
      /> */}

        {/* TODO: replace with CheckboxGroupField */}

        <div>
          <div className="text-lg font-black">Powod sporu</div>
          <div className="flex gap-4">
            {disputeReasonOptions.map(({ id, label }, i) => (
              <label key={i} htmlFor={id}>
                <input
                  type="checkbox"
                  name="disputeReason"
                  value={id}
                  id={id}
                  className="mr-2"  
                  onChange={onDisputeReasonEdit}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ---- */}

      <div className="w-fit ml-auto">
        <Button
          message="Zapisz dane nt. sporu zbiorowego"
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProtocolForm;
