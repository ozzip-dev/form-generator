import { toggleRequiredAction } from "@/actions/edit-form/editFormInput/toggleRequiredAction";
import { toggleUniqueAction } from "@/actions/edit-form/editFormInput/toggleUniqueAction";
import { useInputData } from "@/context/InputDataContextProvider";
import InputDataToggleSwitch from "./InputDataToggleSwitch";


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



const ToggleInputs = () => {
  const { formId, input } = useInputData()
  return (
    <div className="flex flex-col gap-4 w-[26rem] md:w-[23rem] md:ml-auto">
      {toggleSwitchesData.map(
        ({ name, label, action, infoText }, idx) => (
          <InputDataToggleSwitch
            formId={formId as string}
            input={input}
            {...{ action, label, name, infoText }}
            key={idx}
          />
        ),
      )}
    </div>
  );
};

export default ToggleInputs;