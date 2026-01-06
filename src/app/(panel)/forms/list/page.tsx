import FormsTemplatesList from "@/components/pages/form/form-template-list/FormsTemplatesList";
import FormsLIst from "@/components/pages/form/forms-list/FormsLIst";
import FormTrigger from "@/components/pages/form/FormTrigger";
import { SuspenseErrorBoundary } from "@/components/shared";

const FormListPage = async () => {
  return (
    <div className="mb-10 container">
      <section>
        <SuspenseErrorBoundary
          errorMessage="Błąd ładowania listy formularzy"
          loadingMessage="Ładowanie listy formularzy"
          size="lg"
        >
          <FormsLIst />
        </SuspenseErrorBoundary>
      </section>
      <section>
        <FormsTemplatesList />
      </section>
    </div>
  );
};

export default FormListPage;
