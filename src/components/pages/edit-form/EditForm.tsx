import { GetFormAction } from "@/actions/create-form/GetFormAction";
import { serializeForm } from "@/lib/form-utils";
import { Form } from "@/types/form";
import EditFormForm from "../create-form/EditFormForm";
import SuspenseErrorBoundary from "@/components/ui/errors/SuspenseErrorBoundary";

type Props = {
  formId: string;
};

const EditForm = async (props: Props) => {
  const { form, templateInputs } = await GetFormAction(props.formId);
  return (
    <>
      <SuspenseErrorBoundary size="lg" errorMessage="Błąd edycji formularza">
        <EditFormForm
          form={serializeForm(form as Form)}
          // templateInputs={templateInputs}
        />
      </SuspenseErrorBoundary>
    </>
  );
};

export default EditForm;
