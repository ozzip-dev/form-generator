import CreatedForm from "@/components/pages/form/CreatedForm";
import { serializeForm } from "@/lib/serialize-utils";
import { getForm } from "@/services/form-service";

type Props = { params: Promise<{ formId: string }> };

const FormPreviewPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getForm(formId);
  const formSerialized = serializeForm(form);
  return <CreatedForm form={formSerialized} isPreview={true} />;
};

export default FormPreviewPage;
