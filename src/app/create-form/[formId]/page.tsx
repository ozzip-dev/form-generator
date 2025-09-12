import { db, findById, parseObjProps } from "@/lib/mongo";
import "@/components/pages/create-form/create-form.css";
import EditForm from "@/components/pages/EditForm";
import { Document, ObjectId } from "mongodb";
import { Form } from "@/types/form";
import { redirect } from "next/navigation";

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

    return (
      <>
        <EditForm form={parseObjProps(form) as Form} />
      </>
    );
  } catch (e) {
    goToCreateForm();
  }
};
export default CreateFormPage;
