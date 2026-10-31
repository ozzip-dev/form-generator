import AddFormField from "@/components/pages/edit-form/AddFormField";
import EditFormHeader from "@/components/pages/edit-form/edit-form-header/EditFormHeader";
import EditFormInput from "@/components/pages/edit-form/edit-form-input/EditFormInput";
import EditFormNavigation from "@/components/pages/edit-form/EditFormNavigation";
import FormActiveInfo from "@/components/pages/edit-form/FormActiveInfo";
import FormActions from "@/components/pages/edit-form/publish-form/FormActions";
import { SuspenseErrorBoundary } from "@/components/shared";
import { InputDataContextProvider } from "@/context/InputDataContextProvider";
import { verifyUserIsFormAuthor } from "@/helpers/formAccess";
import { isActive, isDisabled, isDraft } from "@/helpers/formHelpers";
import { serializeFile } from "@/lib/serialize-utils";
import { getFileById } from "@/services/file-service";
import { getForm } from "@/services/form-service";
import { getSubmissionCount } from "@/services/result-service";
import { File } from "@/types/file";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Edycja formularza",
};

type Props = { params: Promise<{ formId: string }> };

const EditFormPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getForm(formId);

  await verifyUserIsFormAuthor(form, formId);

  const { inputs, headerFileId } = form;
  const file: File | null = headerFileId
    ? await getFileById(headerFileId)
    : null;
  const submissionCount: number = await getSubmissionCount(formId as string);
  const inputsNumbers = [...Array(inputs.length)].map((_, i) => i + 1);

  const hasReachedInputLimit =
    form.inputs?.length >=
    Number(process.env.NEXT_PUBLIC_MAX_INPUTS_PER_FORM || 20);

  const displayInfoFrame = isActive(form) || isDisabled(form);

  return (
    <div className="container">
      {displayInfoFrame && <FormActiveInfo submissionCount={submissionCount} />}

      {isDraft(form) && (
        <div className="flex flex-col md:flex-row-reverse md:gap-8">
          <SuspenseErrorBoundary
            size="sm"
            errorMessage="Błąd publikacji formularza"
          >
            <div className="top-0 h-fit md:sticky md:w-[25rem]">
              <FormActions formStructure={form} />
            </div>
          </SuspenseErrorBoundary>
          <div className="flex flex-1 flex-col gap-8">
            <SuspenseErrorBoundary
              size="lg"
              errorMessage="Błąd edycji nagłówka formularza"
              loadingMessage="Ładowanie danych formularza"
            >
              <EditFormHeader
                headerFileData={file ? serializeFile(file)?.data : null}
              />
            </SuspenseErrorBoundary>

            <div className="ml-8 text-lg font-extrabold">Pytania</div>

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
                      formId={form._id!}
                      inputNumber={idx + 1}
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
          </div>{" "}
          <EditFormNavigation ids={["header", ...inputsNumbers.map(String)]} />
        </div>
      )}
    </div>
  );
};

export default EditFormPage;
