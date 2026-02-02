import CreateFormMenu from "@/components/pages/edit-form/CreateFormMenu";
import { FormDataContextProvider } from "@/context/FormDataContextProvider";
import { PublishFormErrorContextProvider } from "@/context/PublishFormErrorContextProvider";
import { getForm } from "@/services/form-service";

type Props = { params: Promise<{ formId: string }>; children: React.ReactNode };

export default async function CreateFormLayout(props: Props) {
  const { formId } = await props.params;
  const formPromise = getForm(formId);


  return (
    <FormDataContextProvider formDataPromise={formPromise}>
      <PublishFormErrorContextProvider>
        <div className="h-full flex flex-col">
          <div className="shrink-0 container">
            <CreateFormMenu formId={formId} />
          </div>

          <section className="flex-1 overflow-y-auto">{props.children}</section>
        </div>
      </PublishFormErrorContextProvider>
    </FormDataContextProvider>

  );
}
