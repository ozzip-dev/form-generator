import { Button } from "@/components/shared";
import Checkbox from "@/components/shared/inputs/checkboxField/Checkbox";
import { FormInputSelectable } from "@/types/input";

type Props = {
  inputs: FormInputSelectable[];
  setInputs: (inputs: FormInputSelectable[]) => void;
};

const ResultFieldSelect = (props: Props) => {
  const formInputs: FormInputSelectable[] = props.inputs;

  const onChange = (id: string) => {
    props.setInputs([
      ...formInputs.map((input) =>
        input.id == id
          ? {
              ...input,
              selected: !input.selected,
            }
          : input,
      ),
    ]);
  };

  const setAllInputs = (selected: boolean): void => {
    props.setInputs([...formInputs.map((input) => ({ ...input, selected }))]);
  };

  return (
    <div>
      <div className="font-black">
        Wyświetl odpowiedzi na zazanczone pytania
      </div>

      <div className="w-fit max-h-[380px] flex flex-col flex-wrap gap-y-sm py-sm gap-x-[100px] *:h-[40px]">
        {formInputs.map(({ id, header }) => (
          <div key={id}>
            <Checkbox
              name={header}
              onChange={() => onChange(id as string)}
              checkedValue={!!formInputs.find((el) => el.id == id)?.selected}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-md my-sm">
        <Button
          variant="primary-rounded"
          type="button"
          onClickAction={() => setAllInputs(true)}
          message="Zaznacz wszystko"
        />

        <Button
          variant="primary-rounded"
          type="button"
          onClickAction={() => setAllInputs(false)}
          message="Odznacz wszystko"
        />
      </div>
    </div>
  );
};

export default ResultFieldSelect;
