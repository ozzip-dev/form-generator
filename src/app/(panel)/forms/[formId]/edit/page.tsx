import AddFormField from "@/components/pages/edit-form/AddFormField";
import CreatedUpdatedInfo from "@/components/pages/edit-form/CreatedUpdatedInfo";
import EditFormInput from "@/components/pages/edit-form/edit-form-input/EditFormInput";
import { SuspenseErrorBoundary } from "@/components/shared";
import { serializeFile } from "@/lib/serialize-utils";
import EditFormHeader from "@/components/pages/edit-form/edit-form-header/EditFormHeader";
import FormActions from "@/components/pages/edit-form/publish-form/FormActions";
import { getForm } from "@/services/form-service";
import FormActiveInfo from "@/components/pages/edit-form/FormActiveInfo";
import { isActive } from "@/helpers/formHelpers";
import { getFileById } from "@/services/file-service";
import { File } from "@/types/file";
import { InputDataContextProvider } from "@/context/InputDataContextProvider";
import { getAllSubmissions } from "@/services/result-service";
import { Submission } from "@/types/result";

type Props = { params: Promise<{ formId: string }> };

const EditFormPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getForm(formId);
  const { inputs, createdAt, updatedAt, headerFileId, resultVisibility } = form;
  const file: File | null = headerFileId
    ? await getFileById(headerFileId)
    : null;
  const submissions: Submission[] = await getAllSubmissions(formId as string);

  const hasReachedInputLimit =
    form.inputs?.length >=
    Number(process.env.NEXT_PUBLIC_MAX_INPUTS_PER_FORM || 20);

  const isFormActive = isActive(form);

  let textNumber = 0;

  return (
    <div className="container">
      {isFormActive && <FormActiveInfo submissionsCount={submissions.length} />}

      {!isFormActive && (
        <>
          <SuspenseErrorBoundary
            size="sm"
            errorMessage="Błąd publikacji formularza"
          >
            <FormActions form={form} />
          </SuspenseErrorBoundary>
          <div className="flex flex-col gap-8">
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
                const number = input.type !== "paragraph" ? ++textNumber : null;

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
                      formId={form._id!}
                      inputNumber={number}
                    >
                      <EditFormInput />
                    </InputDataContextProvider>
                  </SuspenseErrorBoundary>
                );
              })}

            {hasReachedInputLimit ? (
              <div className="m-auto pb-6 text-lg">
                Osiągnięto maksymalną liczbę pól w formularzu
              </div>
            ) : (
              <SuspenseErrorBoundary
                errorMessage="Błąd tworzenia pól formularza"
                size="sm"
              >
                <AddFormField formId={formId} idx={inputs.length + 1} />
              </SuspenseErrorBoundary>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EditFormPage;
