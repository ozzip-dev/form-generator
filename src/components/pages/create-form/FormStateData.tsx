"use client";

import { FormSerialized } from "@/types/form";
import PublishFormButton from "./PublishFormButton";
import { isDraft } from "@/helpers/formHelpers";

type Props = {
  form: FormSerialized;
};

// TODO: Tymczasowy komponent, na bank to będzie inaczej
const FormStateData = ({ form }: Props) => {
  const isStateDraft: boolean = isDraft(form)
  const formUrl = `/${form.url || `submit/${form._id}`}`

  return (
      isStateDraft ? (
        <div className="w-fit flex items-center gap-3 *:flex-shrink-0">
          <div>
            Formularz jest szkicem.
          </div>
          <PublishFormButton form={form} />
        </div>
      ) : (
        <div className="flex gap-2 m-4">
          <div>
            Opublikowano:
          </div>
            <div className="font-bold">{formUrl}</div>
        </div>
      )
  );
};

export default FormStateData;
