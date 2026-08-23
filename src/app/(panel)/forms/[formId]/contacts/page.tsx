import Contacts from "@/components/pages/contacts/Contacts";
import { FormType } from "@/enums/form";
import { verifyUserIsFormAuthor } from "@/helpers/formAccess";
import { getForm, getFormById } from "@/services/form-service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Lista kontaktów organizacji",
};

type Props = { params: Promise<{ formId: string }> };

const ContactsPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getForm(formId);
  const { type } = await getFormById(formId);

  await verifyUserIsFormAuthor(form, formId);

  return (
    <div className="container">
      <Contacts type={type as FormType} />
    </div>
  );
};

export default ContactsPage;
