import { GetFormAction } from "@/actions/edit-form/GetFormAction";
import { serializeForm } from "@/lib/serialize-utils";
import EditFormForm from "../create-form/EditFormForm";

type Props = {
  formId: string;
};

const EditForm = async (props: Props) => {
  const form = await GetFormAction(props.formId);

  return (
    <>
      <EditFormForm form={serializeForm(form)} />
    </>
  );
};

export default EditForm;
