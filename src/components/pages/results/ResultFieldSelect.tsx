import { FormInputSelectable } from "@/types/input";

type Props = {
  inputs: FormInputSelectable[];
  setInputs: (inputs: FormInputSelectable[]) => void;
};

const ResultFieldSelect = (props: Props) => {
  const formInputs: FormInputSelectable[] = props.inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setInputs([
      ...formInputs.map((input) =>
        input.id == e.target.value
          ? {
              ...input,
              selected: !input.selected,
            }
          : input
      ),
    ]);
  };

  return (
    <div>
      <div className="font-bold">Wyświetl odpowiedzi na zazanczone pytania</div>
      {formInputs.map(({ id, header }) => (
        <div key={id} className="flex gap-2">
          <label className="block" htmlFor={id}>
            {header}
          </label>

          <input
            type="checkbox"
            id={id}
            className="pl-2"
            onChange={onChange}
            checked={formInputs.find((el) => el.id == id)?.selected}
            value={id}
          />
        </div>
      ))}
    </div>
  );
};

export default ResultFieldSelect;
