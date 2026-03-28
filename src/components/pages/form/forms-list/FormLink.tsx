"use server";

import Link from "next/link";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { FormSerialized, FormState } from "@/types/form";
import { formStateWithLabels, isActive } from "@/helpers/formHelpers";
import { Submission } from "@/types/result";
import { getAllSubmissions } from "@/services/result-service";
import Icon from "@/components/shared/icons/Icon";

type Props = { form: Partial<FormSerialized> };

type FormStateConfig = {
  bgColor: string;
  textColor: string;
  iconConfig: { icon: string; size: number; color: string };
};

const stateConfig: Partial<Record<FormState, FormStateConfig>> = {
  draft: {
    bgColor: "bg-[#eee7ff]",
    textColor: "text-[#b08bff]",
    iconConfig: { icon: "pencil", size: 31, color: "#b08bff" },
  },
  active: {
    bgColor: "bg-[#e8f9f0]",
    textColor: "text-[#45ba7e]",
    iconConfig: { icon: "circle-check", size: 44, color: "#45ba7e" },
  },
  disabled: {
    bgColor: "bg-[#ffe8d6]",
    textColor: "text-[#ff9800]",
    iconConfig: { icon: "xmark", size: 44, color: "#ff9800" },
  },
};

export default async function FormLink(props: Props) {
  const { _id, state, updatedAt } = props.form;
  const formattedDate = formatDateAndTime(updatedAt);
  const submissions: Submission[] = await getAllSubmissions(_id as string);
  const isFormActive = props.form && isActive(props.form as FormSerialized);

  const config = state && stateConfig[state as FormState];
  const { bgColor, textColor, iconConfig } = config || stateConfig.draft!;

  return (
    <li className="w-[13rem]">
      <Link
        href={`/forms/${props.form._id}/edit`}
        className={`flex h-[13rem] w-full items-center justify-center rounded-md border px-8 py-6 text-xs transition ${bgColor} hover:bg-accent_light md:rounded-lg`}
      >
        <div className={textColor}>
          <Icon
            icon={iconConfig!.icon}
            size={iconConfig!.size}
            className="mx-auto mb-3"
            color={iconConfig!.color}
          />
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
