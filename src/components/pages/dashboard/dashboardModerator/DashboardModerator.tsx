import SuspenseErrorBoundary from "@/components/ui/errors/SuspenseErrorBoundary";
import FormTrigger from "./FormTrigger";
import FormsTemplatesList from "./formTemplatesLIst/FormsTemplatesList";
import FormsLIst from "./formsList/FormsLIst";

const DashboardModerator = async () => {
  return (
    <div className="mb-10">
      <div className="size-fit">
        <FormTrigger />
      </div>

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
