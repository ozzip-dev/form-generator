import CreatedForm from "@/components/pages/form/CreatedForm";
import { serializeFile, serializeForm } from "@/lib/serialize-utils";
import { getFileById } from "@/services/file-service";
import { getForm } from "@/services/form-service";
import { File } from "@/types/file";

type Props = { params: Promise<{ formId: string }> };

const FormPreviewPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getForm(formId);
  const formSerialized = serializeForm(form);
  const file: File | null = form.headerFileId
    ? await getFileById(form.headerFileId)
    : null;

  return (
    <CreatedForm
      form={formSerialized}
      isPreview={true}
      headerFileData={file ? serializeFile(file)?.data : null}
    />
  );
};

export default FormPreviewPage;
