"use client";

import { FormSerialized } from "@/types/form";
import PublishFormButton from "./PublishFormButton";
import { isDraft } from "@/helpers/formHelpers";
import AliasUrlForm from "./AliasUrlForm";
import { Button, ButtonLink } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";

type Props = {
  form: FormSerialized;
};

// TODO: Tymczasowy komponent, na bank to będzie inaczej
const PublishForm = ({ form }: Props) => {
  const isStateDraft: boolean = isDraft(form);
  const { _id, url } = form;
  const formUrl: string = `/submit/${url || _id}`;

  const { toast } = useToast();
  const getFormUrl = () => `${window.location.origin}${formUrl}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(getFormUrl());

    toast({
      title: "Skopiowano URL",
      variant: "success",
    });
  };

  return (
    <div className="my-16 *:flex *:items-center *:gap-3">
      {isStateDraft ? (
        <div className="*:flex-shrink-0">
          <div>Formularz jest szkicem</div>
          <PublishFormButton form={form} />
        </div>
      ) : (
        <div className="mb-8">
          <div>Opublikowano:</div>
          <div className="font-bold">{formUrl}</div>

          <Button
            onClickAction={copyUrl}
            message="Kopiuj"
            type="button"
            variant="primary-rounded"
          />
          <div className="w-fit bg-accent rounded-full text-white text-sm py-1 px-6">
            <ButtonLink
              message="Przejdź do formularza"
              link={formUrl}
              target="_blank"
            />{" "}
          </div>
        </div>
      )}

      {!isStateDraft && <AliasUrlForm {...form} />}
    </div>
  );
};

export default PublishForm;
