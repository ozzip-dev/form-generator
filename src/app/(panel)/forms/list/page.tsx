import FormsTemplatesList from "@/components/pages/form/form-template-list/FormsTemplatesList";
import FormsLIst from "@/components/pages/form/forms-list/FormsLIst";
import { SuspenseErrorBoundary } from "@/components/shared";

const FormListPage = async () => {
  return (
    <>
      <section>
        <div className="py-16 container">
          <SuspenseErrorBoundary
            errorMessage="Błąd ładowania listy formularzy"
            loadingMessage="Ładowanie listy formularzy"
            size="lg"
          >
            <FormsLIst />
          </SuspenseErrorBoundary>
        </div>
      </section>
      <section className="bg-bg_dark mb-10">
        <div className="py-16 container">
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
