import { FormInputSelectable } from "@/types/input";

type Props = {
  inputs: FormInputSelectable[]
  setSelectedInputs: (inputs: FormInputSelectable[]) => void;
}

const ResultFieldSelect = (props: Props) => {
  const formInputs: FormInputSelectable[] = props.inputs

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSelectedInputs([
      ...formInputs.map((input) => (input.id == e.target.value ? {
        ...input,
        selected: !input.selected
      } : input))
    ])
  }

  return (
    <div className="my-4">
      <div><b>Wybierz pola do wyników</b></div>
      {formInputs.map((input) => (
        <div
          key={input.id}
          className="flex gap-2"  
        >
          <label className="block" htmlFor={input.id}>
            {input.header}
          </label>

          <input 
            type="checkbox"
            id={input.id}
            className="pl-2"
            onChange={onChange}
            checked={formInputs.find((el) => el.id == input.id)?.selected}
            value={input.id}
          />
        </div>
      ))}
    </div>
  );
};

export default ResultFieldSelect;
