import AddFormField from "@/components/pages/edit-form/AddFormField";
import CreatedUpdatedInfo from "@/components/pages/edit-form/CreatedUpdatedInfo";
import EditFormInput from "@/components/pages/edit-form/editFormInput/EditFormInput";
import { SuspenseErrorBoundary } from "@/components/shared";
import { serializeForm } from "@/lib/serialize-utils";
import EditFormHeader from "@/components/pages/edit-form/EditFormHeader";
import PublishForm from "@/components/pages/edit-form/PublishForm/PublishForm";
import { getForm } from "@/services/form-service";
import FormActiveInfo from "@/components/pages/edit-form/FormActiveInfo";

type Props = { params: Promise<{ formId: string }> };

const EditFormPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getForm(formId);
  const formSerialized = serializeForm(form);
  const { inputs, createdAt, updatedAt, state } = formSerialized;

  return (
    <>
      <CreatedUpdatedInfo createdAt={createdAt} updatedAt={updatedAt} />
      <SuspenseErrorBoundary size="sm" errorMessage="Błąd pubilacji formularza">
        <PublishForm form={formSerialized} />
      </SuspenseErrorBoundary>

      {/* {state === "active" && <FormActiveInfo />} */}

      {/* {state !== "active" && ( */}
      {state && (
        <>
          <SuspenseErrorBoundary
            size="lg"
            errorMessage="Błąd edycji nagłówka formularza"
            loadingMessage="Ładowanie danych formularza"
          >
            <EditFormHeader form={formSerialized} />
          </SuspenseErrorBoundary>

          {inputs
            .sort((a, b) => a.order - b.order)
            .map((input, idx) => {
              return (
                <SuspenseErrorBoundary
                  key={input.id}
                  size="sm"
                  errorMessage="Błąd edycji pól formularza"
                >
                  <EditFormInput
                    input={input}
                    inputIdx={idx}
                    isLastInput={inputs.length === idx + 1}
                  />
                </SuspenseErrorBoundary>
              );
            })}

          <SuspenseErrorBoundary
            errorMessage="Błąd tworzenia pól formularza"
            size="sm"
          >
            <AddFormField />
          </SuspenseErrorBoundary>
        </>
      )}
    </>
  );
};

export default EditFormPage;
