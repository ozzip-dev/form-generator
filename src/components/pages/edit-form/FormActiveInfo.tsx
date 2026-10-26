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
import CloseFormBtn from "./disable-form/CloseFormBtn";
import { useToast } from "@/context/ToastProvider";
import { copyFormAction } from "@/actions/form/copyFormAction";
import CloseFormEditor from "./CloseFormEditor";

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
  const [isEditorOpen, setIsEditorOpen] = useState(false);

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
    ? "Formularz jest aktywny, edycja niedostępna."
    : "Formularz jest nieaktywny, edycja niedostępna.";

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
    <div className="flex flex-col md:flex-row md:gap-8">
      <div className="flex-1 pb-32 pt-8">
        <div className="mb-2 text-xl">{title}</div>
        <div className="mb-10 text-font-light">
          {formStateInfo} <br /> Aby zmienić pytania, skopiuj formularz jako
          nowy szkic.
        </div>

        {isEditorOpen && (
          <Card className="mb-8 bg-white">
            {isFormActive && _id && (
              <CloseFormEditor formId={_id} setIsEditorOpen={setIsEditorOpen} />
            )}
          </Card>
        )}
        <Card className="bg-white">
          <div className="mb-4 font-extrabold">Opublikowany pod adresem</div>

          <div className="font-semibold text-font-dark">{link}</div>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <Button
              className="w-fit"
              variant="empty-accent"
              onClickAction={handleCopy}
            >
              Kopiuj link
            </Button>

            <ButtonLink
              link={`/${url ? url : _id!}`}
              target="_blank"
              variant="primary-rounded"
              className="w-fit"
            >
              {" "}
              Przejdź do formularza
            </ButtonLink>
          </div>
        </Card>
        <Card className="my-8 flex flex-col gap-4 bg-white sm:flex-row sm:justify-between">
          <div>
            <span className="text-extrabold mr-2 text-xl">
              {submissionCount}
            </span>
            zapisane wyniki{" "}
          </div>

          <ButtonLink
            link={`/forms/${_id}/results/details`}
            target="_blank"
            variant="primary-rounded"
            className="mt-3 w-fit"
          >
            Przejdź do wyników
          </ButtonLink>
        </Card>
        <Card className="bg-white">
          <div className="mb-4 font-extrabold">Szczegóły</div>

          <div className="flex">
            <p className="w-52">Kategoria:</p> <p>{mapTypes[type]}</p>
          </div>
          <div className="flex">
            <p className="w-52">Tryb wyników:</p>{" "}
            <p>{resultVisibility === "open" ? "jawny" : "tajny"}</p>
          </div>
          <div className="flex">
            <p className="w-52">Utworzono:</p>{" "}
            <p>{formatDateAndTime(createdAt)}</p>
          </div>
          <div className="flex">
            <p className="w-52">Opublikowano:</p>{" "}
            <p>{formatDateAndTime(updatedAt)}</p>
          </div>
        </Card>
      </div>
      <div className="top-0 md:sticky md:h-fit md:w-[25rem]">
        <div className="pb-32 pt-8">
          <Card className="bg-white">
            <h3 className="mb-8 text-lg font-extrabold">Usatwienia</h3>{" "}
            {isAuthor && _id && (
              <div className="flex flex-col">
                <Button
                  isLoading={isPending}
                  className=""
                  variant="empty-accent"
                  onClickAction={handleCopyForm}
                >
                  Skopiuj formularz
                </Button>
                <p className="mb-8 text-sm text-font-light">
                  Tworzy nowy formularz z tymi samymi pytaniami.
                </p>

                {isFormActive && (
                  <CloseFormBtn
                    isEditorOpen={isEditorOpen}
                    setIsEditorOpen={setIsEditorOpen}
                  />
                )}

                <RemoveFormButton formId={_id} />
                <p className="text-sm text-font-light">
                  Usuwa formularz razem z zapisanymi wynikami. Tej operacji nie
                  można cofnąć.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormActiveInfo;
