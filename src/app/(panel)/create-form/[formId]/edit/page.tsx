import { GetForm } from "@/actions/create-form/GetForm";
import EditForm from "@/components/form/EditForm";
import { serializeForm } from "@/lib/form-utils";
import { parseObjProps } from "@/lib/mongo";
import { Form } from "@/types/form";

type Props = { params: Promise<{ formId: string }> };

const PageEditForm = async (props: Props) => {
  const { formId } = await props.params;

  const { form, templateInputs } = await GetForm(formId);

  return (
    <EditForm
      initialForm={serializeForm(form as Form)}
      templateInputs={templateInputs.map((el) => parseObjProps(el))}
    />
  );
};

export default PageEditForm;
