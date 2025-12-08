import { CheckboxGroupField, InputFields } from "@/components/shared";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProtocolFormSchema,
  protocolFormSchema,
} from "@/lib/zodSchema/editFormSchemas/protocolFormSchema";

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

const dataInputsProtocolForm = [
  {
    label: "Branża produkcji",
    name: "productionBranch",
    placeholder: "Budownictwo",
    type: "text",
  },
  {
    label: "Nazwa przedsiębiorstwa",
    name: "companyName",
    placeholder: "firma",
    type: "text",
  },
  {
    label: "Data rozpoczęcia sporu",
    name: "startDate",
    type: "date",
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

const ProtocolForm = () => {
  const methods = useForm<ProtocolFormSchema>({
    resolver: zodResolver(protocolFormSchema),
    mode: "all",
  });
  const {
    register,
    formState: { errors },
    trigger,
    setError,
    control,
  } = methods;

  return (
    <form action="" className=" w-4/5 m-auto">
      <InputFields
        inputsData={dataInputsProtocolForm}
        register={register}
        errorMsg={errors}
        // onChange={handleEdit}
        // isLoading={isLoading}
      />
      <CheckboxGroupField
        groupLabel={"Przyczyna rozpoczęcia sporu"}
        name="barganingReason"
        options={dataCheckboxOptions}
        control={control}
        errorMsg={errors}
      />
    </form>
  );
};

export default ProtocolForm;
