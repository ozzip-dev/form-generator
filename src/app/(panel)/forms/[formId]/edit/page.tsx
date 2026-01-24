import AddFormField from "@/components/pages/edit-form/AddFormField";
import CreatedUpdatedInfo from "@/components/pages/edit-form/CreatedUpdatedInfo";
import EditFormInput from "@/components/pages/edit-form/editFormInput/EditFormInput";
import { SuspenseErrorBoundary } from "@/components/shared";
import { serializeFile, serializeForm } from "@/lib/serialize-utils";
import EditFormHeader from "@/components/pages/edit-form/EditFormHeader";
import FormActions from "@/components/pages/edit-form/PublishForm/FormActions";
import { getForm } from "@/services/form-service";
import FormActiveInfo from "@/components/pages/edit-form/FormActiveInfo";
import { isActive } from "@/helpers/formHelpers";
import { getFileById } from "@/services/file-service";
import { File } from "@/types/file";
import { InputDataContextProvider } from "@/context/InputDataContextProvider";

type Props = { params: Promise<{ formId: string }> };

const EditFormPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getForm(formId);
  const { inputs, createdAt, updatedAt, headerFileId } = form;
  const file: File | null = headerFileId
    ? await getFileById(headerFileId)
    : null;

  const hasReachedInputLimit =
    form.inputs?.length >=
    Number(process.env.NEXT_PUBLIC_MAX_INPUTS_PER_FORM || 20);

  return (
    <div className="container">
      <CreatedUpdatedInfo createdAt={createdAt} updatedAt={updatedAt} />
      <SuspenseErrorBoundary
        size="sm"
        errorMessage="Błąd publikacji formularza"
      >
        <FormActions form={form} />
      </SuspenseErrorBoundary>

      {isActive(form) ? (
        <FormActiveInfo />
      ) : (

        <div className="flex flex-col gap-10">
          <SuspenseErrorBoundary
            size="lg"
            errorMessage="Błąd edycji nagłówka formularza"
            loadingMessage="Ładowanie danych formularza"
          >
            <EditFormHeader
              headerFileData={file ? serializeFile(file)?.data : null}
            />
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
                  <InputDataContextProvider
                    input={input}
                    inputIdx={idx}
                    isLastInput={inputs.length === idx + 1}
                    formId={form.id!}>
                    <EditFormInput />
                  </InputDataContextProvider>

                </SuspenseErrorBoundary>
              );
            })}

          {hasReachedInputLimit ? (
            <div className="pb-6 m-auto text-lg">
              Osiągnięto maksymalną liczbę pól w formularzu
            </div>
          ) : (
            <SuspenseErrorBoundary
              errorMessage="Błąd tworzenia pól formularza"
              size="sm"
            >
              <AddFormField />
            </SuspenseErrorBoundary>
          )}
        </div>
      )}
    </div>
  );
};

export default EditFormPage;
