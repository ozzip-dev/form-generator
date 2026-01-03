import FormsTemplatesList from "@/components/pages/form/form-template-list/FormsTemplatesList";
import FormsLIst from "@/components/pages/form/forms-list/FormLIst";
import FormTrigger from "@/components/pages/form/FormTrigger";
import { SuspenseErrorBoundary } from "@/components/shared";

const FormListPage = async () => {
  return (
    <div className="mb-10">
      <SuspenseErrorBoundary errorMessage="Błąd tworzenia formularza" size="sm">
        <div className="size-fit">
          <FormTrigger />
        </div>
      </SuspenseErrorBoundary>
      <SuspenseErrorBoundary
        errorMessage="Błąd ładowania listy formularzy"
        loadingMessage="Ładowanie listy formularzy"
        size="lg"
      >
        <FormsLIst />
      </SuspenseErrorBoundary>
      <FormsTemplatesList />
    </div>
  );
};

export default FormListPage;
