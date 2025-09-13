"use server";

import { db, findById, parseObjProps } from "@/lib/mongo";
import EditForm from "@/components/pages/EditForm";
import { Document, ObjectId } from "mongodb";
import { Form } from "@/types/form";
import { redirect } from "next/navigation";
import { Input } from "@/types/input";
import { getTemplateInputs } from "@/services/input-services";
import { AddInputToDraft } from "@/actions/form/AddInputToDraft";

type Props = { params: { formId: string } };

const CreateFormPage = async (props: Props) => {
  /* 
    If id in url is an invalid ObjectId or record doesn't exist, 
    redirect to create form. Add info msg 
  */
  const goToCreateForm = () => {
    redirect("/create-form");
  };

  const { formId } = await props.params;

  try {
    const form: Document | null = await findById(
      db,
      "form",
      new ObjectId(formId)
    );

    if (!form) goToCreateForm();

    const templateInputs: Input[] = await getTemplateInputs(db);

    async function addField(input: Input): Promise<void> {
      "use server";

      await AddInputToDraft(db, new ObjectId(formId), input as Input);
    }

    return (
      <>
        <EditForm
          form={parseObjProps(form) as Form}
          templateInputs={templateInputs.map((el) => parseObjProps(el))}
          addField={addField}
        />
      </>
    );
  } catch (e) {
    goToCreateForm();
  }
};
export default CreateFormPage;
