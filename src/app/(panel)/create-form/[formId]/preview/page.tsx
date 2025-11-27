import CreatedForm from "@/components/pages/form/CreatedForm";
import { serializeForm } from "@/lib/serialize-utils";
import { getForm } from "@/services/queries/getForm";
import { Form } from "@/types/form";

type Props = { params: Promise<{ formId: string }> };

const FormPreviewPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getForm(formId);

  return <CreatedForm form={serializeForm(form as Form)} isPreview={true} />;
};

export default FormPreviewPage;
