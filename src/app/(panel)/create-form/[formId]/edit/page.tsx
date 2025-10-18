import { GetForm } from "@/actions/create-form/GetForm";
import AddFormField from "@/components/pages/create-form/AddFormField";
import EditFormForm from "@/components/pages/create-form/EditFormForm";
import DataLoading from "@/components/ui/loaders/DataLoading";
import { serializeForm } from "@/lib/form-utils";
import { Form } from "@/types/form";
import { Suspense } from "react";

type Props = { params: Promise<{ formId: string }> };

const PageEditForm = async (props: Props) => {
  const { formId } = await props.params;

  const { form, templateInputs } = await GetForm(formId);

  return (
    <>
      <Suspense fallback={<DataLoading />}>
        <EditFormForm
          form={serializeForm(form as Form)}
          templateInputs={templateInputs}
        />
      </Suspense>
      <AddFormField />
    </>
  );
};

export default PageEditForm;
