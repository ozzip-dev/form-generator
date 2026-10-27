"use server";

import Link from "next/link";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { FormSerialized, FormState } from "@/types/form";
import { formStateWithLabels, isActive } from "@/helpers/formHelpers";
import { Submission } from "@/types/result";
import { getAllSubmissions } from "@/services/result-service";
import { ButtonLink, Card, Icon } from "@/components/shared";

type Props = { form: Partial<FormSerialized> };

type FormStateConfig = {
  bgColor: string;
  border: string;
  iconConfig: {
    icon: string;
    size: number;
    color: string;
    textColor: string;
    border: string;
  };
};

const stateConfig: Partial<Record<FormState, FormStateConfig>> = {
  draft: {
    bgColor: "bg-bg-dark",
    border: "border-t-gray",
    iconConfig: {
      icon: "pencil",
      size: 12,
      color: "bg-font-light",
      textColor: "text-font-light",
      border: "bg-dark",
    },
  },
  active: {
    bgColor: "bg-active/10",
    border: "border-t-active",
    iconConfig: {
      icon: "circle-check",
      size: 18,
      color: "bg-active",
      textColor: "text-active",
      border: "border-active",
    },
  },
  disabled: {
    bgColor: "bg-disabled/10",
    border: "border-t-disabled",
    iconConfig: {
      icon: "xmark",
      size: 14,
      color: "bg-disabled",
      textColor: "text-disabled",
      border: "border-disabled",
    },
  },
};

export default async function FormLink(props: Props) {
  const { _id, state, updatedAt } = props.form;
  const formattedDate = formatDateAndTime(updatedAt);
  const submissions: Submission[] = await getAllSubmissions(_id as string);

  const config = state && stateConfig[state as FormState];
  const { bgColor, iconConfig, border } = config || stateConfig.draft!;

  return (
    <li className="mb-4 sm:mb-0">
      <ButtonLink
        variant="ghost"
        link={`/forms/${props.form._id}/edit`}
        aria-label={`Formularz: ${props.form.title ?? "Brak tytułu"}`}
      >
        <Card className={`cardHover !border-t-4 ${border} !bg-white`}>
          <div
            className={`flex w-fit items-center gap-2 rounded-full ${bgColor} border ${iconConfig.border} px-4 py-2`}
          >
            <Icon
              icon={iconConfig!.icon}
              size={iconConfig!.size}
              className={`${iconConfig.color}`}
            />
            <div className={`text-xs uppercase ${iconConfig.textColor}`}>
              {state && formStateWithLabels[state]}
            </div>
          </div>

          <div className="my-4">
            <div className="truncate text-left">
              {props.form.title ? props.form.title : "Brak tytułu"}
            </div>
            <p className="mt-1 text-left text-xs text-font-light">
              Edycja {formattedDate}
            </p>
          </div>

          <div className="border-t border-gray pt-4">
            {state === "draft" && (
              <div className="text-left">
                <span className="text-font-light">Niepublikowany</span>
                <span className="text-lg text-transparent">0</span>{" "}
              </div>
            )}

            {(state === "active" || state === "disabled") && (
              <div className="text-left">
                <span className="text-left text-lg">{submissions.length}</span>{" "}
                <span className="text-font-light">odpowiedzi</span>
              </div>
            )}
          </div>
        </Card>
      </ButtonLink>
    </li>
  );
}
