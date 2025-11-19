import { Suspense } from "react";
import { db } from "@/lib/mongo";
import { isDraft } from "@/helpers/formHelpers";
import { FormCreated } from "@/types/form";
import { redirect } from "next/navigation";
import { getFormBySlug } from "@/services/form-service";
import { DataLoader, SuspenseErrorBoundary } from "@/components/shared";
import { serializeForm } from "@/lib/serialize-utils";
import { Form } from "@/types/form";
import CreatedForm from "@/components/pages/form/CreatedForm";
// Adres roboczy. Strona z formularzem do wypełnienia, dostępna dla wszystkich

type Props = { params: Promise<{ formId: string; url: string }> };

const FormPage = async (props: Props) => {
  const { formId } = await props.params;
  const form: FormCreated | null = await getFormBySlug(db, formId);

  // TODO: what should happen? Redirect + error/warning message?
  if (!form) redirect("/dashboard");
  if (isDraft(form)) redirect(`/create-form/${formId}/edit`);

  return (
    <SuspenseErrorBoundary
      size="lg"
      errorMessage="Błąd ładowania formularza"
      loadingMessage="Ładowanie formularza"
    >
      <CreatedForm form={serializeForm(form as Form)} />
    </SuspenseErrorBoundary>
  );
};

export default FormPage;
