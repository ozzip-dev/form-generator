import { SuspenseErrorBoundary } from "@/components/shared";
import FormTrigger from "./FormTrigger";
import FormsTemplatesList from "./formTemplatesLIst/FormsTemplatesList";
import FormsLIst from "./formsList/FormsLIst";

const DashboardModerator = async () => {
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

export default DashboardModerator;
