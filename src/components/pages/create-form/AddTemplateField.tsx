import { Input } from "@/types/input";

type Props = { inputs: Input[] };

const AddTemplateField = (props: Props) => {
  return (
    <select>
      <option value="">Dodaj pole</option>
      {props.inputs.map((el, i) => (
        <option key={i}>{el.header}</option>
      ))}
    </select>
  );
};

export default AddTemplateField;
