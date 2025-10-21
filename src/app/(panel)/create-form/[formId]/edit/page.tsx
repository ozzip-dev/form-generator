import Error from "@/app/(panel)/dashboard-moderator/error";
import AddFormField from "@/components/pages/create-form/AddFormField";
import EditForm from "@/components/pages/edit-form/EditForm";
import DataLoading from "@/components/ui/loaders/DataLoading";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

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

      <ErrorBoundary FallbackComponent={Error}>
        {/* <AddFormField /> */}
      </ErrorBoundary>
    </>
  );
};

export default PageEditForm;
