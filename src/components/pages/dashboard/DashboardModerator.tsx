import { getFormTemplates } from "@/services/form-service";
import { db } from "@/lib/mongo";
import { Form } from "@/types/form";
import TemplateSelect from "../create-form/TemplateSelect";

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
      <TemplateSelect templates={templates} />
      <div className="p-4">twoje formularze</div>
    </>
  );
};

export default DashboardModerator;
