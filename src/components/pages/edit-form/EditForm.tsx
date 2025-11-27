import { serializeForm } from "@/lib/serialize-utils";
import EditFormForm from "./EditFormForm";
import { getForm } from "@/services/queries/getForm";

type Props = {
  formId: string;
};

const EditForm = async (props: Props) => {
  const form = await getForm(props.formId);

  return <EditFormForm form={serializeForm(form)} />;
};

export default EditForm;
