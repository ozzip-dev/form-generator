"use client";

import { Button, ButtonLink, Card } from "@/components/shared";
import { useFormData } from "@/context/FormDataContextProvider";
import { useUser } from "@/context/UserContextProvider";
import { isActive, isUserAuthor } from "@/helpers/formHelpers";
import { UserSerialized } from "@/types/user";
import {
  startTransition,
  use,
  useActionState,
  useEffect,
  useState,
} from "react";
import RemoveFormButton from "./RemoveFormButton";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import SetFormDisabledForm from "./disable-form/SetFormDisabledForm";
import { useToast } from "@/context/ToastProvider";
import { copyFormAction } from "@/actions/form/copyFormAction";

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

  const [_, copyAction, isPending] = useActionState(async () => {
    try {
      if (!form?._id) return;
      const response = await copyFormAction(form._id);
      if (!!response?.error) {
        toast({
          title: "Błąd",
          description: response.error,
          variant: "error",
        });
      } else {
        toast({
          title: "Sukces",
          description: "Formularz skopiowany. Nowy szkic dodany do listy",
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Błąd przy kopiowaniu formularza.",
        variant: "error",
      });
    }
  }, null);

  const handleCopyForm = () => {
    startTransition(copyAction);
  };

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
        <div className="mb-10 text-font-light">
          Edycja niedostępna, {formStateInfo}
        </div>
        <div className="text-font-light">Opublikowany pod adresem</div>

        <div className="font-semibold text-font-dark">{link}</div>
        <Button
          className="m-auto w-fit"
          variant="primary-rounded"
          onClickAction={handleCopy}
        >
          Skopiuj link formularza
        </Button>
        <ButtonLink
          link={`/${url ? url : _id!}`}
          target="_blank"
          variant="primary-rounded"
          className="m-auto mb-10 w-fit"
        >
          {" "}
          Przejdź do formularza
        </ButtonLink>

        <div className="text-font-light">
          Kategoria formularza:{" "}
          <span className="ml-2 font-semibold text-font-dark">
            {" "}
            {mapTypes[type]}
          </span>
        </div>
        <div className="text-font-light">
          Tryb wyników:{" "}
          <span className="ml-2 font-semibold text-font-dark">
            {" "}
            {resultVisibility === "open" ? "jawny" : "tajny"}
          </span>
        </div>
        <div className="text-font-light">
          Zapisane wyniki:{" "}
          <span className="ml-2 font-semibold text-font-dark">
            {submissionCount}
          </span>
        </div>

        <ButtonLink
          link={`/forms/${_id}/results/details`}
          target="_blank"
          variant="primary-rounded"
          className="m-auto mb-3 mt-16 w-fit"
        >
          Przejdź do wyników
        </ButtonLink>

        <div className="text-font_light mt-16 text-xs">
          <div className="">Utworzono: {formatDateAndTime(createdAt)}</div>
          <div className="">Opublikowano: {formatDateAndTime(updatedAt)}</div>
        </div>
      </Card>

      {isAuthor && _id && (
        <div className="flex flex-col gap-sm pb-20">
          <Button
            isLoading={isPending}
            className="ml-auto w-fit"
            variant="primary-rounded"
            onClickAction={handleCopyForm}
          >
            Skopiuj formularz
          </Button>

          {isFormActive && <SetFormDisabledForm formId={_id} />}

          <RemoveFormButton formId={_id} />
        </div>
      )}
    </>
  );
};

export default FormActiveInfo;
