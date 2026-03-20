import FormsTemplatesList from "@/components/pages/form/form-template-list/FormsTemplatesList";
import FormsLIst from "@/components/pages/form/forms-list/FormsLIst";
import { SuspenseErrorBoundary } from "@/components/shared";

const FormListPage = async () => {
  return (
    <>
      <section>
        <div className="container px-4 py-16 sm:px-8 md:flex md:px-24">
          <SuspenseErrorBoundary
            errorMessage="Błąd ładowania listy formularzy"
            loadingMessage="Ładowanie listy formularzy"
            size="lg"
          >
            <FormsLIst />
          </SuspenseErrorBoundary>
        </div>
      </section>
      <section className="bg-bg_dark pb-10">
        <div className="container px-4 py-16 sm:px-8 md:flex md:px-24">
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
