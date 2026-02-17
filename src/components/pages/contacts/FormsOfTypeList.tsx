import { FormSerialized } from "@/types/form";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { formStateWithLabels } from "@/helpers/formHelpers";
import Link from "next/link";

type Props = {
  forms: FormSerialized[];
};

const FormsOfTypeList = ({ forms }: Props) => {
  return (
    <div className="flex flex-col gap-4 divide-y divide-default py-4">
      {forms.map(({ title, createdAt, state, url, _id }, i) => (
        <div key={i} className="flex gap-sm pt-4">
          <div className="font-black">{title}</div>
          <div>Utworzono: {formatDateAndTime(createdAt)}</div>
          {state && <div>Stan: {formStateWithLabels[state]}</div>}

          <Link
            className="btn-primary-rounded text-white"
            href={`/${url || _id}`}
            target="_blank"
          >
            Przejdź
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FormsOfTypeList;
