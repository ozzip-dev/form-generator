import { FormSerialized } from "@/types/form";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { formStateWithLabels } from "@/helpers/formHelpers";

type Props = {
  forms: FormSerialized[];
};

const FormsOfTypeList = ({ forms }: Props) => {
  return (
    <div className="py-4">
      {forms.map(({ title, createdAt, state }, i) => (
        <div key={i} className="flex gap-sm">
          <div className="font-black">{title}</div>
          <div>Utworzono: {formatDateAndTime(createdAt)}</div>
          {state && <div>Stan: {formStateWithLabels[state]}</div>}
        </div>
      ))}
    </div>
  );
};

export default FormsOfTypeList;
