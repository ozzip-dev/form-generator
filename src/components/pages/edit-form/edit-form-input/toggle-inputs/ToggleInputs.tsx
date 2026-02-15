import { toggleRequiredAction } from "@/actions/edit-form/edit-form-input/toggleRequiredAction";
import { toggleUniqueAction } from "@/actions/edit-form/edit-form-input/toggleUniqueAction";
import { useInputData } from "@/context/InputDataContextProvider";
import InputDataToggleSwitch from "./InputDataToggleSwitch";
import { toggleHiddenAction } from "@/actions/edit-form/edit-form-input/toggleHiddenAction";

// TODO Pawel: jesli zostawiamy jak jest, zrobić wspolną akcje i fn mongo dla edycji
// unique, hidden, reuquired
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
  {
    name: "hidden",
    label: `Odpowiedź ukryta`,
    infoText: "Dana odpowiedź nie będzie widoczna w raporcie",
    action: toggleHiddenAction,
  },
];

const ToggleInputs = () => {
  const { formId, input } = useInputData();
  return (
    <div className="flex w-[26rem] flex-col gap-4 md:ml-auto md:w-[23rem]">
      {toggleSwitchesData.map(({ name, label, action, infoText }, idx) => (
        <InputDataToggleSwitch
          formId={formId as string}
          input={input}
          {...{ action, label, name, infoText }}
          key={idx}
        />
      ))}
    </div>
  );
};

export default ToggleInputs;
