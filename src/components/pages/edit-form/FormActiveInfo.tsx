"use client";

import { Button, ButtonLink, Card, Icon } from "@/components/shared";
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

  useEffect(() => {
    if (!form) return;

    const element = document.querySelector<HTMLElement>(
      "#inputs-change-loader",
    );

    if (!element) return;

    const wasHidden = element.classList.contains("hidden");

    element.classList.add("hidden");

    return () => {
      if (!wasHidden) {
        element.classList.remove("hidden");
      }
    };
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

  const formStateInfo = (
    <div
      className={`flex w-fit items-center gap-2 rounded-full border ${isFormActive ? "bg-active/10" : "bg-disabled/10"} ${isFormActive ? "border-active" : "border-disabled"} px-4 py-2`}
    >
      <Icon
        icon={isFormActive ? "circle-check" : "xmark"}
        size={20}
        className={`${isFormActive ? "bg-active" : "bg-disabled"}`}
      />
      <div
        className={`text-xs uppercase ${isFormActive ? "text-active" : "text-disabled"}`}
      >
        FORMULARZ {isFormActive ? "AKTYWNY" : "NIEAKTYWNY"}
      </div>
    </div>
  );

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
      <div className="flex-1 pt-8 md:pb-32">
        <div className="mb-2 text-xl">{title}</div>
        <div className="mb-10 text-font-light">
          <div>{formStateInfo}</div>
          <div className="mt-4">
            Edycja niedostępna, aby zmienić pytania, skopiuj formularz jako nowy
            szkic.
          </div>
        </div>

        {isEditorOpen && (
          <Card className="mb-8">
            {isFormActive && _id && (
              <CloseFormEditor formId={_id} setIsEditorOpen={setIsEditorOpen} />
            )}
          </Card>
        )}
        <Card className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
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
            <div className="flex items-center gap-2">
              {
                <Icon
                  icon="chart-line"
                  size={18}
                  className="bg-white group-hover:bg-accent"
                />
              }
              <p> Przejdź do wyników</p>
            </div>
          </ButtonLink>
        </Card>

        <Card className="mb-8">
          <div className="mb-4 font-extrabold">Opublikowany pod adresem</div>

          <div className="font-semibold text-font-dark">{link}</div>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <Button
              className="w-fit"
              variant="empty-accent"
              onClickAction={handleCopy}
            >
              <div className="flex items-center gap-2">
                {
                  <Icon
                    icon="copy"
                    size={16}
                    className="bg-accent group-hover:bg-white"
                  />
                }
                <p>Kopiuj link</p>
              </div>
            </Button>

            <ButtonLink
              link={`/${url ? url : _id!}`}
              target="_blank"
              variant="primary-rounded"
              className="w-fit"
            >
              {" "}
              <div className="flex items-center gap-2">
                {
                  <Icon
                    icon="external-link"
                    size={16}
                    className="bg-white group-hover:bg-accent"
                  />
                }
                <p>Przejdź do formularza</p>
              </div>
            </ButtonLink>
          </div>
        </Card>

        <Card>
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
          <Card className="mb-8">
            <h3 className="mb-8 text-lg font-extrabold">Akcje</h3>{" "}
            {isAuthor && _id && (
              <div className="flex flex-col">
                <Button
                  isLoading={isPending}
                  className=""
                  variant="empty-accent"
                  onClickAction={handleCopyForm}
                >
                  <div className="flex items-center gap-2">
                    {
                      <Icon
                        icon="copy"
                        size={16}
                        className="bg-accent group-hover:bg-white"
                      />
                    }
                    <p> Skopiuj formularz</p>
                  </div>
                </Button>
                <p className="mb-16 mt-2 text-sm text-font-light">
                  Tworzy nowy formularz z tymi samymi pytaniami.
                </p>

                {isFormActive && (
                  <CloseFormBtn
                    isEditorOpen={isEditorOpen}
                    setIsEditorOpen={setIsEditorOpen}
                  />
                )}

                <RemoveFormButton formId={_id} />
                <p className="mt-2 text-sm text-font-light">
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
