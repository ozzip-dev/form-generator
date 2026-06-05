"use server";

import Link from "next/link";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { FormSerialized, FormState } from "@/types/form";
import { formStateWithLabels, isActive } from "@/helpers/formHelpers";
import { Submission } from "@/types/result";
import { getAllSubmissions } from "@/services/result-service";
import { Icon } from "@/components/shared";

type Props = { form: Partial<FormSerialized> };

type FormStateConfig = {
  bgColor: string;

  iconConfig: { icon: string; size: number; color: string };
};

const stateConfig: Partial<Record<FormState, FormStateConfig>> = {
  draft: {
    bgColor: "bg-accent_lighter",
    iconConfig: { icon: "pencil", size: 31, color: "bg-accent" },
  },
  active: {
    bgColor: "bg-[#e8f9f0]",
    iconConfig: { icon: "circle-check", size: 44, color: "bg-[#45ba7e]" },
  },
  disabled: {
    bgColor: "bg-[#ffe8d6]",
    iconConfig: { icon: "xmark", size: 40, color: "bg-[#ff9800]" },
  },
};

export default async function FormLink(props: Props) {
  const { _id, state, updatedAt } = props.form;
  const formattedDate = formatDateAndTime(updatedAt);
  const submissions: Submission[] = await getAllSubmissions(_id as string);
  const isFormActive = props.form && isActive(props.form as FormSerialized);

  const config = state && stateConfig[state as FormState];
  const { bgColor, iconConfig } = config || stateConfig.draft!;

  return (
    <li className="w-[11rem]">
      <Link
        href={`/forms/${props.form._id}/edit`}
        className={`m-auto flex aspect-square w-[11rem] items-center justify-center rounded-md border text-xs transition ${bgColor} hover:bg-[#ffa4a4] md:rounded-lg`}
        aria-label={`Formularz: ${props.form.title ?? "Brak tytułu"}`}
      >
        <div>
          <Icon
            icon={iconConfig!.icon}
            size={iconConfig!.size}
            className={`mx-auto mb-3 ${iconConfig.color}`}
          />
          <div className="text-center font-semibold uppercase">
            {state && formStateWithLabels[state]}
          </div>
          {isFormActive && (
            <div className="text-center">
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
