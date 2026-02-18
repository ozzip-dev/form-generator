"use client";

import { ButtonLink, Card } from "@/components/shared";
import { useFormData } from "@/context/FormDataContextProvider";
import { useUser } from "@/context/UserContextProvider";
import { isUserAuthor } from "@/helpers/formHelpers";
import { UserSerialized } from "@/types/user";
import { use } from "react";
import RemoveFormButton from "./RemoveFormButton";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";

const mapTypes: Record<string, string> = {
  survey: "ankieta pracownicza",
  inspector: "wybory SIP",
  strike: "referendum strajkowe",
  other: "inne",
};

type Props = {
  submissionCount: number;
};

const FormActiveInfo = ({ submissionCount }: Props) => {
  const { formDataPromise } = useFormData();
  const { userPromise } = useUser();
  const user: UserSerialized | null = use(userPromise);
  const form = use(formDataPromise);

  if (!form) return null;

  const { _id, title, url, createdAt, updatedAt, resultVisibility, type } =
    form;

  const isAuthor = user && isUserAuthor(form, user._id);

  return (
    <>
      <Card className="my-16 flex flex-col gap-4 text-center text-sm">
        <div className="text-lg">Opublikowany formularz</div>
        <div className="font-bold">{title}</div>
        <div className="text-font_light">Edycja niedostępna</div>
        <div className="text-font_light">
          Kategoria formularza:{" "}
          <span className="ml-2 font-bold text-font_dark">
            {" "}
            {mapTypes[type]}
          </span>
        </div>
        <div className="text-font_light">
          Tryb wyników:{" "}
          <span className="ml-2 font-bold text-font_dark">
            {" "}
            {resultVisibility === "open" ? "jawny" : "tajny"}
          </span>
        </div>
        <div className="text-font_light">
          Zapisane wyniki:{" "}
          <span className="ml-2 font-bold text-font_dark">
            {submissionCount}
          </span>
        </div>

        <ButtonLink
          message="Przejdź do opublikowanego formularza"
          link={`/${url ? url : _id!}`}
          target="_blank"
          variant="primary-rounded"
          className="m-auto mt-16 w-fit"
        />

        <div className="text-2xs text-font_light">
          <div className="">Utworzono: {formatDateAndTime(createdAt)}</div>
          <div className="">Opublikowano: {formatDateAndTime(updatedAt)}</div>
        </div>
      </Card>

      {isAuthor && _id && (
        <div className="ml-auto w-fit">
          <RemoveFormButton formId={_id} />
        </div>
      )}
    </>
  );
};

export default FormActiveInfo;
