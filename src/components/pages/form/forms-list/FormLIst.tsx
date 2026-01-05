import { getSerializedFormList } from "@/services/form-service";
import FormLink from "./FormLink";
import { SuspenseErrorBoundary } from "@/components/shared";
import FormTrigger from "../FormTrigger";

const FormsLIst = async () => {
  const forms = await getSerializedFormList();

  if (!forms || forms.length === 0) {
    return <div>Brak zapisanych formularzy</div>;
  }

  return (
    <ul className="flex flex-wrap gap-4 ">
      <SuspenseErrorBoundary errorMessage="Błąd tworzenia formularza" size="sm">
        <FormTrigger />
      </SuspenseErrorBoundary>
      {forms.map((form) => {
        return <FormLink form={form} key={form._id} />;
      })}
    </ul>
  );
};

export default FormsLIst;
