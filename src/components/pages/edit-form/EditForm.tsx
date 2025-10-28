import { GetForm } from "@/actions/create-form/GetForm";
import { serializeForm } from "@/lib/serialize-utils";
import { Form } from "@/types/form";
import EditFormForm from "../create-form/EditFormForm";

type Props = {
  formId: string;
};

const EditForm = async (props: Props) => {
  const { form, templateInputs } = await GetForm(props.formId);
  return (
    <>
      <EditFormForm
        form={serializeForm(form as Form)}
        // templateInputs={templateInputs}
      />
    </>
  );
};

export default EditForm;
