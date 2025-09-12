import CreateForm from "@/components/pages/CreateForm";
import { getFormTemplates } from "@/services/form-service";
import { db } from "@/lib/mongo";
import "@/components/pages/create-form/create-form.css";

const CreateFormPage = async () => {
  const templates = await getFormTemplates(db);
  const formTemplates = templates.map(({ id, title, description, inputs }) => ({
    id,
    title,
    description,
    inputs,
  }));

  return (
    <>
      <CreateForm templates={formTemplates} />
    </>
  );
};
export default CreateFormPage;
