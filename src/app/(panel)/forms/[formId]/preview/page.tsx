import CreatedForm from "@/components/pages/form/created-form/CreatedForm";
import { isTemplate } from "@/helpers/formHelpers";
import { getForm, getFormAdditionalData } from "@/services/form-service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Podgląd formularza",
};

type Props = { params: Promise<{ formId: string }> };

const FormPreviewPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getForm(formId);

<<<<<<< HEAD
  const { authorEmail, headerFileData } = !isTemplate(form)
    ? await getFormAdditionalData(formId)
    : {};
=======
  const { authorEmail, headerFileData } = await getFormAdditionalData(formId);
>>>>>>> wcag

  return (
    <div className="flex h-full flex-col justify-between">
      <CreatedForm
        form={form}
        isPreview={true}
        {...{ authorEmail, headerFileData }}
      />
    </div>
  );
};

export default FormPreviewPage;
