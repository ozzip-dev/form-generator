"use client";

import { FormSerialized } from "@/types/form";
import PublishFormButton from "./PublishFormButton";
import { isDraft } from "@/helpers/formHelpers";
import AliasUrlForm from "./AliasUrlForm";

type Props = {
  form: FormSerialized;
};

// TODO: Tymczasowy komponent, na bank to będzie inaczej
const FormStateData = ({ form }: Props) => {
  const isStateDraft: boolean = isDraft(form)
  const formUrl = `/${form.url || `submit/${form._id}`}`

  return (
      <div className="m-4">
        {
          isStateDraft ? (
            <div className="w-fit flex items-center gap-3 *:flex-shrink-0">
              <div>
                Formularz jest szkicem.
              </div>
              <PublishFormButton form={form} />
            </div>
          ) : (
            <div className="flex gap-2">
              <div>
                Opublikowano:
              </div>
                <div className="font-bold">{formUrl}</div>
            </div>
          )
        }

        {!isStateDraft && <AliasUrlForm {...form} />}
      </div>
  );
};

export default FormStateData;
