import FormsTemplatesList from "@/components/pages/form/form-template-list/FormsTemplatesList";
import FormsLIst from "@/components/pages/form/forms-list/FormLIst";
import FormTrigger from "@/components/pages/form/FormTrigger";
import { SuspenseErrorBoundary } from "@/components/shared";

const FormListPage = async () => {
  return (
    <div className="mb-10 container">
      <div>twoje formularze (maksymalnie 10 formularzy)</div>
      <div className="flex gap-4">
        <SuspenseErrorBoundary
          errorMessage="Błąd ładowania listy formularzy"
          loadingMessage="Ładowanie listy formularzy"
          size="lg"
        >
          <FormsLIst />
        </SuspenseErrorBoundary>
      </div>{" "}
      <FormsTemplatesList />
    </div>
  );
};

export default FormListPage;
