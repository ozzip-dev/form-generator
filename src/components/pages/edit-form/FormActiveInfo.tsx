"use client";

import { Button, ButtonLink, Card } from "@/components/shared";
import { useFormData } from "@/context/FormDataContextProvider";
import { useUser } from "@/context/UserContextProvider";
import { isActive, isUserAuthor } from "@/helpers/formHelpers";
import { UserSerialized } from "@/types/user";
import { use, useEffect, useState } from "react";
import RemoveFormButton from "./RemoveFormButton";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import SetFormDisabledForm from "./disable-form/SetFormDisabledForm";
import { useToast } from "@/context/ToastProvider";

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
  const { toast } = useToast();

  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  if (!form) return null;

  const { _id, title, url, createdAt, updatedAt, resultVisibility, type } =
    form;

  const isAuthor = user && isUserAuthor(form, user._id);

  const isFormActive = isActive(form);
  const formStateInfo = isFormActive
    ? "formularz aktywny"
    : "formularz nieaktywny";

  const linkPath = `/${url || _id}`;
  const link = origin ? `${origin}${linkPath}` : linkPath;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);

      toast({
        title: "Sukces",
        description: "Link skopiowany do schowka",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Błąd",
        description: "Nie udało się skopiować linku",
        variant: "error",
      });
    }
  };

  return (
    <>
      <Card className="my-16 flex flex-col gap-2 text-center text-sm">
        <div className="text-lg font-semibold">{title}</div>
        <div className="mb-10 text-font_light">
          Edycja niedostępna, {formStateInfo}
        </div>
        <div className="text-font_light">Opublikowany pod adresem</div>

        <div className="font-semibold text-font_dark">{link}</div>
        <Button
          message="Skopiuj link formularza"
          className="m-auto w-fit"
          variant="primary-rounded"
          onClickAction={handleCopy}
        />
        <ButtonLink
          message="Przejdź do formularza"
          link={`/${url ? url : _id!}`}
          target="_blank"
          variant="primary-rounded"
          className="m-auto mb-10 w-fit"
        />

        <div className="text-font_light">
          Kategoria formularza:{" "}
          <span className="ml-2 font-semibold text-font_dark">
            {" "}
            {mapTypes[type]}
          </span>
        </div>
        <div className="text-font_light">
          Tryb wyników:{" "}
          <span className="ml-2 font-semibold text-font_dark">
            {" "}
            {resultVisibility === "open" ? "jawny" : "tajny"}
          </span>
        </div>
        <div className="text-font_light">
          Zapisane wyniki:{" "}
          <span className="ml-2 font-semibold text-font_dark">
            {submissionCount}
          </span>
        </div>

        <ButtonLink
          message="Przejdź do wyników"
          link={`/forms/${_id}/results/details`}
          target="_blank"
          variant="primary-rounded"
          className="m-auto mb-3 mt-16 w-fit"
        />

        <div className="mt-16 text-2xs text-font_light">
          <div className="">Utworzono: {formatDateAndTime(createdAt)}</div>
          <div className="">Opublikowano: {formatDateAndTime(updatedAt)}</div>
        </div>
      </Card>

      {isAuthor && _id && (
        <div className="flex flex-col gap-sm pb-20">
          {isFormActive && <SetFormDisabledForm formId={_id} />}

          <RemoveFormButton formId={_id} />
        </div>
      )}
    </>
  );
};

export default FormActiveInfo;
