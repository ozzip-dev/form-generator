import { DiagramType } from "@/types/result";

type Props = {
  diagrams: DiagramType[]
  setDiagrams: (diagrams: DiagramType[]) => void;
}

const ResultDiagramSelect = (props: Props) => {
  const selectableDiagrams: DiagramType[] = props.diagrams

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setDiagrams([
      ...selectableDiagrams.map((diagram) => (diagram.value == e.target.value ? {
        ...diagram,
        selected: !diagram.selected
      } : diagram))
    ])
  }

  return (
    <div>
      <div><b>Wybierz typ diagramu</b></div>
      {props.diagrams.map(({ value, label }) => (
        <div
          key={value}
          className="flex gap-2"  
        >
          <label className="block" htmlFor={value}>
            {label}
          </label>

          <input 
            type="checkbox"
            id={value}
            className="pl-2"
            onChange={onChange}
            checked={selectableDiagrams.find((el) => el.value == value)?.selected}
            value={value}
          />
        </div>
      ))}
    </div>
  );
};

export default ResultDiagramSelect;
