import AddFormField from "@/components/pages/create-form/AddFormField";
import EditForm from "@/components/pages/edit-form/EditForm";
import DataLoading from "@/components/ui/loaders/DataLoading";
import SuspenseErrorBoundary from "@/components/ui/errors/SuspenseErrorBoundary";
import { Suspense } from "react";

type Props = { params: Promise<{ formId: string }> };

const PageEditForm = async (props: Props) => {
  const { formId } = await props.params;

  return (
    <>
      <Suspense
        fallback={
          <DataLoading
            message="Ładowanie formularza"
            className="min-h-[400px]"
          />
        }
      >
        <EditForm formId={formId} />
      </Suspense>

      <SuspenseErrorBoundary errorMessage="Błąd przesyłu danych formularza">
        <AddFormField />
      </SuspenseErrorBoundary>
    </>
  );
};

export default PageEditForm;
