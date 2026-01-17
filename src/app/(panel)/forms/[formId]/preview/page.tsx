import CreatedForm from "@/components/pages/form/CreatedForm";
import { serializeForm } from "@/lib/serialize-utils";
import { getForm, getFormAdditionalData } from "@/services/form-service";

type Props = { params: Promise<{ formId: string }> };

const FormPreviewPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getForm(formId);
  const formSerialized = serializeForm(form);

  const { authorEmail, headerFileData } = await getFormAdditionalData(formId);

  return (
    <CreatedForm
      form={formSerialized}
      isPreview={true}
      {...{ authorEmail, headerFileData }}
    />
  );
};

export default FormPreviewPage;
