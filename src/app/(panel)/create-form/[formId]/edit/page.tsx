import AddFormField from "@/components/pages/edit-form/AddFormField";
import EditForm from "@/components/pages/edit-form/EditForm";
import EditInputForm from "@/components/pages/edit-form/EditInputForm";
import { SuspenseErrorBoundary } from "@/components/shared";
import { getForm } from "@/services/queries/getForm";
import { serializeForm } from "@/lib/serialize-utils";

type Props = { params: Promise<{ formId: string }> };

const EditFormPage = async (props: Props) => {
  const { formId } = await props.params;
  const { inputs } = await getForm(formId);

  return (
    <>
      <SuspenseErrorBoundary
        size="lg"
        errorMessage="Błąd edycji formularza"
        loadingMessage="Ładowanie danych formularza"
      >
        <EditForm formId={formId} />
      </SuspenseErrorBoundary>

      {inputs
        .sort((a, b) => a.order - b.order)
        .map((el, idx) => {
          return (
            <SuspenseErrorBoundary
              key={el.id}
              size="sm"
              errorMessage="Błąd przesyłu danych pól formularza"
            >
              <EditInputForm
                key={el.id}
                input={el}
                inputIdx={idx}
                inputsLength={inputs.length}
              />
            </SuspenseErrorBoundary>
          );
        })}

      <SuspenseErrorBoundary
        errorMessage="Błąd przesyłu danych formularza"
        size="sm"
      >
        <AddFormField />
      </SuspenseErrorBoundary>
    </>
  );
};

export default EditFormPage;
