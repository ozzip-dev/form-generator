import { getSerializedFormList } from "@/services/form-service";
import FormLink from "./FormLink";
import { SuspenseErrorBoundary } from "@/components/shared";
import FormTrigger from "../FormTrigger";
import SectionHeader from "@/components/shared/SectionHeader";

const FormsLIst = async () => {
  const forms = await getSerializedFormList();

  if (!forms || forms.length === 0) {
    return <div>Brak zapisanych formularzy</div>;
  }

  return (
    <>
      <div className="w-full md:flex items-center ">
        <SectionHeader message="Twoje formularze" />
        <div className="text-center md:text-left md:ml-4 text-xs mb-6">
          (maks. 10 formularzy)
        </div>
      </div>

      <ul className="flex flex-wrap justify-center md:justify-start gap-4">
        <SuspenseErrorBoundary
          errorMessage="Błąd tworzenia formularza"
          size="sm"
        >
          <FormTrigger />
        </SuspenseErrorBoundary>
        {forms.map((form) => {
          return <FormLink form={form} key={form._id} />;
        })}
      </ul>
    </>
  );
};

export default FormsLIst;
