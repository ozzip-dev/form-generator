import { GetFormAction } from "@/actions/edit-form/GetFormAction";
import CreatedForm from "@/components/pages/view/CreatedForm";

import { serializeForm } from "@/lib/serialize-utils";
import { Form } from "@/types/form";

type Props = { params: Promise<{ formId: string }> };

const FormPreviewPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await GetFormAction(formId);

  return <CreatedForm form={serializeForm(form as Form)} />;
};

export default FormPreviewPage;
