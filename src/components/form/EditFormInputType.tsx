import { EditType } from "@/actions/input";
import { InputType } from "@/enums";
import { FormInput } from "@/types/input";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  formId: string;
  input: FormInput;
  index: number;
};

export default function EditFormInputType(props: Props) {
  const {
    formId,
    input: { id: inputId, header, description, type },
    index,
  } = props;
  const { register, watch, setValue } = useFormContext();
  const inputTypes = Object.values(InputType);

  const typeKey = `inputs.${index}.type`;
  const watchedType = watch(typeKey);

  useEffect(() => {
    EditType(formId, inputId!, watchedType);
  }, [watchedType, formId, inputId]);

  useEffect(() => {
    setValue(typeKey, type);
  }, [type, setValue, typeKey]);

  return (
    <div>
      <label htmlFor={typeKey}>Typ: </label>
      <select
        {...register(`inputs.${props.index}.type`)}
        className="h-fit border border-black"
      >
        {inputTypes.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}
