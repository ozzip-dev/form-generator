import FormsTemplatesList from "@/components/pages/form/form-template-list/FormsTemplatesList";
import FormsLIst from "@/components/pages/form/forms-list/FormsLIst";
import { SuspenseErrorBoundary } from "@/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Lista formularzy",
};

const FormListPage = async () => {
  return (
    <>
      <section className="pt-16">
        <div className="container">
          <SuspenseErrorBoundary
            errorMessage="Błąd ładowania listy formularzy"
            loadingMessage="Ładowanie listy formularzy"
            size="lg"
          >
            <FormsLIst />
          </SuspenseErrorBoundary>
        </div>
      </section>
      <section className="py-32">
        <div className="container">
          <SuspenseErrorBoundary
            errorMessage="Błąd tworzenia szablonu formularza"
            size="lg"
          >
            <FormsTemplatesList />
          </SuspenseErrorBoundary>
        </div>
      </section>
    </>
  );
};

export default FormListPage;
