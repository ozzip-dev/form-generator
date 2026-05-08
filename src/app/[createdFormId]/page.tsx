import { db } from "@/lib/mongo";
import { isDraft, isDisabled, isTemplate } from "@/helpers/formHelpers";
import { FormCreated } from "@/types/form";
import { redirect } from "next/navigation";
import { getFormAdditionalData, getFormBySlug } from "@/services/form-service";
import { SuspenseErrorBoundary } from "@/components/shared";
import { serializeForm } from "@/lib/serialize-utils";
import { Form } from "@/types/form";
import CreatedForm from "@/components/pages/form/created-form/CreatedForm";
import FormDescription from "@/components/shared/inputs/FormDescription";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Opublikowany formularz",
};

type Props = { params: Promise<{ createdFormId: string; url: string }> };

const FormPage = async (props: Props) => {
  const { createdFormId } = await props.params;
  const form: FormCreated | null = await getFormBySlug(db, createdFormId);

  if (!form) redirect("/dashboard");

  const { authorEmail, headerFileData } = !isTemplate(form)
    ? await getFormAdditionalData(form._id?.toString() as string)
    : {};

  return (
    <SuspenseErrorBoundary
      size="lg"
      errorMessage="Błąd ładowania formularza"
      loadingMessage="Ładowanie formularza"
    >
      <section className="h-screen overflow-hidden">
        <div className="flex h-full flex-col justify-between overflow-y-auto">
          {isDisabled(form) ? (
            <div className="container my-4 !max-w-[800px]">
              <p className="mb-5 text-center text-sm text-font_light">
                Formularz nieaktywny
              </p>
              <h1 className="mb-8 text-lg font-bold">{form.title}</h1>
              <FormDescription
                description={form.disabledText || ""}
                variant="edit"
              />
            </div>
          ) : (
            <CreatedForm
              form={serializeForm(form as Form)}
              {...{ authorEmail, headerFileData }}
              isTemplatePreview={isTemplate(form)}
            />
          )}
        </div>
      </section>
    </SuspenseErrorBoundary>
  );
};

export default FormPage;
