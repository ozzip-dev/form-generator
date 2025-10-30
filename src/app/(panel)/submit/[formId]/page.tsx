import DataLoading from "@/components/ui/loaders/DataLoading";
import { Suspense } from "react";
import { db, findById } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { isDraft } from "@/helpers/formHelpers";
import { FormCreated } from "@/types/form";
import { redirect } from "next/navigation";
import Form from "@/components/pages/form/Form";

type Props = { params: Promise<{ formId: string }> };

const FormPage = async (props: Props) => {
  const { formId } = await props.params;
  const form: FormCreated | null = await findById(db, 'form', new ObjectId(formId)) as FormCreated | null

  // TODO: what should happen? Redirect + error/warning message?
  if (!form) redirect('/dashboard')
  if (isDraft(form)) redirect(`/create-form/${formId}/edit`)

  return (
    <>
      <Suspense
        fallback={
          <DataLoading
            message="Ładowanie formularza"
            className="min-h-[400px]"
          />
        }
      >
        <Form form={form!} />
      </Suspense>
    </>
  );
};

export default FormPage;
