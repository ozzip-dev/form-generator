import { db } from "@/lib/mongo";
import { isDraft } from "@/helpers/formHelpers";
import { FormCreated } from "@/types/form";
import { redirect } from "next/navigation";
import { getFormAdditionalData, getFormBySlug } from "@/services/form-service";
import { SuspenseErrorBoundary } from "@/components/shared";
import { serializeForm } from "@/lib/serialize-utils";
import { Form } from "@/types/form";
import CreatedForm from "@/components/pages/form/CreatedForm";

type Props = { params: Promise<{ formId: string; url: string }> };

const FormPage = async (props: Props) => {
  const { formId } = await props.params;
  const form: FormCreated | null = await getFormBySlug(db, formId);

  if (!form) redirect("/dashboard");
  if (isDraft(form)) redirect(`/forms/${formId}/edit`);

  const { authorEmail, headerFileData } = await getFormAdditionalData(formId);

  return (
    <SuspenseErrorBoundary
      size="lg"
      errorMessage="Błąd ładowania formularza"
      loadingMessage="Ładowanie formularza"
    >
      <section className="h-screen overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="container my-16">
            <CreatedForm
              form={serializeForm(form as Form)}
              {...{ authorEmail, headerFileData }}
            />
          </div>
        </div>
      </section>
    </SuspenseErrorBoundary>
  );
};

export default FormPage;
