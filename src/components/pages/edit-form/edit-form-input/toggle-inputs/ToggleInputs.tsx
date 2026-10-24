import { toggleRequiredAction } from "@/actions/edit-form/edit-form-input/toggleRequiredAction";
import { toggleUniqueAction } from "@/actions/edit-form/edit-form-input/toggleUniqueAction";
import { useInputData } from "@/context/InputDataContextProvider";
import InputDataToggleSwitch from "./InputDataToggleSwitch";
import { toggleHiddenAction } from "@/actions/edit-form/edit-form-input/toggleHiddenAction";
import { FormInput } from "@/types/input";

const toggleSwitchesData = (formInput: FormInput) => [
  {
    name: "required",
    label: `Wymagana`,
    infoText: "Bez wypełnienia pola formularz nie zostanie wysłany",
    action: toggleRequiredAction,
    disabled: formInput.hidden || formInput.unique,
  },
  {
    name: "unique",
    label: `Unikalna`,
    infoText:
      "Ponowne przekazanie tej samej odpowiedzi zablokuje wysłanie formularza.",
    action: toggleUniqueAction,
    disabled: formInput.hidden,
  },
  {
    name: "hidden",
    label: `Ukryta`,
    infoText:
      "Odpowiedź nie będzie widoczna w wynikach. Dotyczy unikalnych i tajnych wartości takich jak dane osobowe, numery identyfikacyjne itd.",
    action: toggleHiddenAction,
    disabled: false,
  },
];

const ToggleInputs = () => {
  const { formId, input } = useInputData();
  return (
    <div className="mt-4 flex flex-col flex-wrap gap-4 border-t border-gray pt-4 sm:flex-row">
      {toggleSwitchesData(input).map(
        ({ name, label, action, infoText, disabled }, idx) => (
          <InputDataToggleSwitch
            formId={formId as string}
            input={input}
            {...{ action, label, name, infoText, disabled }}
            key={idx}
          />
        ),
      )}
    </div>
  );
};

export default ToggleInputs;
