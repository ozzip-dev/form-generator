"use server";

import { db, findById, parseObjProps } from "@/lib/mongo";
import { Document, ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { Input } from "@/types/input";
import { getTemplateInputs } from "@/services/input-service";
import EditForm from "@/components/form/EditForm";
import { Form } from "@/types/form";
import { serializeForm } from "@/lib/form-utils";

type Props = { params: Promise<{ formId: string }> };

const PageEditForm = async (props: Props) => {
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

    return (
      <EditForm
        initialForm={serializeForm(form as Form)}
        templateInputs={templateInputs.map((el) => parseObjProps(el))}
      />
    );
  } catch (e) {
    goToCreateForm();
  }
};

export default PageEditForm;
