import { Button } from "@/components/shared";
import Checkbox from "@/components/shared/inputs/checkbox-field/Checkbox";
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
      <div className="my-6 font-bold">
        Wyświetl odpowiedzi na zazanczone pytania
      </div>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-x-12">
        {formInputs.map(({ id, header }, idx) => (
          <div key={id} className="flex gap-2">
            <div>{idx + 1}.</div>
            <Checkbox
              name={header}
              onChange={() => onChange(id as string)}
              checkedValue={!!formInputs.find((el) => el.id == id)?.selected}
              labelClassName="truncate flex-grow w-[5rem]"
            />
          </div>
        ))}
      </div>

      <div className="my-sm flex gap-md">
        <Button
          variant="primary-rounded"
          type="button"
          onClickAction={() => setAllInputs(true)}
          message="Zaznacz wszystkie"
        />

        <Button
          variant="primary-rounded"
          type="button"
          onClickAction={() => setAllInputs(false)}
          message="Odznacz wszystkie"
        />
      </div>
    </div>
  );
};

export default ResultFieldSelect;
