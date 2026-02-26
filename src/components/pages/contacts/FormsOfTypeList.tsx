import { FormSerialized } from "@/types/form";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { formStateWithLabels, isActive } from "@/helpers/formHelpers";
import Link from "next/link";

type Props = {
  forms: FormSerialized[];
};

const FormsOfTypeList = ({ forms }: Props) => {
  return (
    <div className="flex flex-col gap-4 divide-y divide-default py-4">
      {forms.map((form, i) => {
        const { title, createdAt, state, _id } = form;
        return (
          <div key={i} className="flex gap-sm pt-4">
            <div className="font-black">{title}</div>
            <div>Utworzono: {formatDateAndTime(createdAt)}</div>
            {state && <div>Stan: {formStateWithLabels[state]}</div>}
            {isActive(form) && (
              <Link
                className="btn-primary-rounded m-auto text-white"
                href={`/forms/${_id}/preview`}
                target="_blank"
              >
                Przejdź
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FormsOfTypeList;
