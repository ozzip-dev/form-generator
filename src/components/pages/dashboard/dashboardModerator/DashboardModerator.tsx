import { getFormTemplates } from "@/services/form-service";
import { db } from "@/lib/mongo";
import { Form } from "@/types/form";
import TemplateSelect from "./TemplateSelect";
import AddForm from "./AddForm";
import FormsLIst from "./FormsLIst";

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
      <FormsLIst />

      {/* <TemplateSelect templates={templates} /> */}
    </>
  );
};

export default DashboardModerator;
