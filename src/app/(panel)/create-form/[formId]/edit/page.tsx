import AddFormField from "@/components/pages/edit-form/AddFormField";
import EditForm from "@/components/pages/edit-form/EditForm";
import { SuspenseErrorBoundary } from "@/components/shared";

type Props = { params: Promise<{ formId: string }> };

const EditFormPage = async (props: Props) => {
  const { formId } = await props.params;

  return (
    <>
      <SuspenseErrorBoundary
        size="lg"
        errorMessage="Błąd edycji formularza"
        loadingMessage="Ładowanie danych formularza"
      >
        <EditForm formId={formId} />
      </SuspenseErrorBoundary>

      <SuspenseErrorBoundary
        errorMessage="Błąd przesyłu danych formularza"
        size="sm"
      >
        <AddFormField />
      </SuspenseErrorBoundary>
    </>
  );
};

export default EditFormPage;
