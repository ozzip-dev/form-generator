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
  const formUrl: string = form.url ?? `${window.location.origin}/submit/${form._id}`

  return (
      isStateDraft ? (
        <div className="flex justify-end">
          Formularz jest szkicem. <PublishFormButton form={form} />
        </div>
      ) : (
        <div className="flex gap-2 m-4">
          <div>
            Opublikowano:
          </div>
          <a
            href={formUrl}
            target="_blank"
            className="font-bold"
          >{formUrl}</a>
        </div>
      )
  );
};

export default FormStateData;
