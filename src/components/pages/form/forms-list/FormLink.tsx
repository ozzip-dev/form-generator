"use server";

import Link from "next/link";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { FormSerialized } from "@/types/form";
import { formStateWithLabels, isActive } from "@/helpers/formHelpers";
import { Submission } from "@/types/result";
import { getAllSubmissions } from "@/services/result-service";

type Props = { form: Partial<FormSerialized> };

export default async function FormLink(props: Props) {
  const { _id, state, updatedAt } = props.form;
  const isFormActive = props.form && isActive(props.form as FormSerialized);
  const formattedDate = formatDateAndTime(updatedAt);
  const submissions: Submission[] = await getAllSubmissions(_id as string);
  const backgroundColor = isFormActive ? "#e4f2e4" : "#faf6cd";

  return (
    <li className="w-[13rem]">
      <Link
        href={`/forms/${props.form._id}/edit`}
        className="flex h-[13rem] w-full items-center justify-center rounded-md border bg-bg_light px-8 py-6 text-xs transition hover:bg-accent md:rounded-lg"
        style={{ backgroundColor }}
      >
        <div>
          <div className="font-semibold">
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
