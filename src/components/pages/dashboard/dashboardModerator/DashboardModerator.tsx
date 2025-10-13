import { getFormTemplates } from "@/services/form-service";
import { db } from "@/lib/mongo";
import { Form } from "@/types/form";
import TemplateSelect from "./TemplateSelect";
import AddForm from "./AddForm";
import FormsLIst from "./FormsLIst";
import { Suspense } from "react";
import Loading from "@/app/(panel)/dashboard-moderator/loading";
import Error from "@/app/(panel)/dashboard-moderator/error";
import { ErrorBoundary } from "react-error-boundary";

const DashboardModerator = async () => {
  const templates: Form[] = await getFormTemplates(db);
  const formTemplates = templates.map(({ id, title, description, inputs }) => ({
    id,
    title,
    description,
    inputs,
  }));

  return (
    <>
      <div className="size-fit">
        <AddForm />
      </div>
      <ErrorBoundary FallbackComponent={Error}>
        <Suspense fallback={<Loading />}>
          <FormsLIst />
        </Suspense>
      </ErrorBoundary>

      {/* <TemplateSelect templates={templates} /> */}
    </>
  );
};

export default DashboardModerator;
