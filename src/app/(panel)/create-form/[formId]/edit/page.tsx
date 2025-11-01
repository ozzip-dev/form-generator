import AddFormField from "@/components/pages/create-form/AddFormField";
import EditForm from "@/components/pages/edit-form/EditForm";
import SuspenseErrorBoundary from "@/components/ui/errors/SuspenseErrorBoundary";

type Props = { params: Promise<{ formId: string }> };

const PageEditForm = async (props: Props) => {
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

export default PageEditForm;
