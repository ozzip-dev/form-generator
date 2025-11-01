"use client";

import { FormSerialized } from "@/types/form";
import PublishFormButton from "./PublishFormButton";
import { isDraft } from "@/helpers/formHelpers";
import AliasUrlForm from "./AliasUrlForm";
import ButtonClick from "@/components/ui/buttons/ButtonClick";
import { useToast } from "@/hooks/useToast";

type Props = {
  form: FormSerialized;
};

// TODO: Tymczasowy komponent, na bank to będzie inaczej
const FormStateData = ({ form }: Props) => {
  const isStateDraft: boolean = isDraft(form)
  const formUrl = `/${form.url || `submit/${form._id}`}`

  const { toast } = useToast();
  
  const copyUrl = () => {
    const url = `${window.location.origin}/submit${formUrl}`

    navigator.clipboard.writeText(url)

    toast({
      title: 'Skopiowano URL',
      variant: 'success'
    })
  }

  return (
      <div className="m-4 *:flex *:items-center *:w-fit *:gap-3">
        {
          isStateDraft ? (
            <div className="*:flex-shrink-0">
              <div>
                Formularz jest szkicem.
              </div>
              <PublishFormButton form={form} />
            </div>
          ) : (
            <div className="mb-2">
              <div>
                Opublikowano:
              </div>
              <div className="font-bold">
                {formUrl}
              </div>
              <ButtonClick 
                onClickAction={copyUrl}
                message="Kopiuj"
              />
            </div>
          )
        }

        {!isStateDraft && <AliasUrlForm {...form} />}
      </div>
  );
};

export default FormStateData;
