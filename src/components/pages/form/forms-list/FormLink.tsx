"use server";

import Link from "next/link";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { FormSerialized } from "@/types/form";
import { formStateWithLabels, isActive } from "@/helpers/formHelpers";
import { Submission } from "@/types/result";
import { getAllSubmissions } from "@/services/result-service";
import Icon from "@/components/shared/icons/Icon";

type Props = { form: Partial<FormSerialized> };

export default async function FormLink(props: Props) {
  const { _id, state, updatedAt } = props.form;
  const isFormActive = props.form && isActive(props.form as FormSerialized);
  const formattedDate = formatDateAndTime(updatedAt);
  const submissions: Submission[] = await getAllSubmissions(_id as string);
  const bgColor = isFormActive ? "bg-[#e8f9f0]" : "bg-[#eee7ff]";
  const icon = isFormActive ? (
    <Icon
      icon="circle-check"
      size={44}
      className="mx-auto mb-3"
      color="#45ba7e"
    />
  ) : (
    <Icon icon="pencil" size={31} className="mx-auto mb-3" color="#b08bff" />
  );

  const textColor = isFormActive ? "text-[#45ba7e]" : "text-[#b08bff]";

  return (
    <li className="w-[13rem]">
      <Link
        href={`/forms/${props.form._id}/edit`}
        className={`flex h-[13rem] w-full items-center justify-center rounded-md border px-8 py-6 text-xs transition ${bgColor} hover:bg-accent_light md:rounded-lg`}
      >
        <div className={textColor}>
          {icon}
          <div className="font-semibold uppercase">
            {state && formStateWithLabels[state]}
          </div>
          {isFormActive && (
            <div>
              Wyniki:{" "}
              <span className="font-semibold">{submissions.length}</span>
            </div>
          )}
        </div>
      </Link>

      <div className="mt-4 line-clamp-2 px-4 text-center">
        {props.form.title ? props.form.title : "Brak tytułu"}
      </div>
      <p className="mt-1 truncate text-center text-2xs text-font_light">
        Edycja <br /> {formattedDate}
      </p>
    </li>
  );
}
