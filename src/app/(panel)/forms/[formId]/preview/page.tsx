import CreatedForm from "@/components/pages/form/created-form/CreatedForm";
import { getForm, getFormAdditionalData } from "@/services/form-service";

type Props = { params: Promise<{ formId: string }> };

const FormPreviewPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getForm(formId);


  const { authorEmail, headerFileData } = await getFormAdditionalData(formId);

  return (
    <CreatedForm
      form={form}
      isPreview={true}
      {...{ authorEmail, headerFileData }}
    />
  );
};

export default FormPreviewPage;
