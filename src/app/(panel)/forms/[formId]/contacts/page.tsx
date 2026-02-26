import Contacts from "@/components/pages/contacts/Contacts";
import { FormType } from "@/enums/form";
import { isUserAuthor } from "@/helpers/formHelpers";
import { getForm, getFormById } from "@/services/form-service";
import { requireUser } from "@/services/user-service";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ formId: string }> };

const ContactsPage = async (props: Props) => {
  const { formId } = await props.params;
  const form = await getForm(formId);
  const { type } = await getFormById(formId);

  // TODO Pawel: move to middleware
  const user = await requireUser();
  if (!isUserAuthor(form, user.id)) redirect(`/forms/${formId}/preview`);

  return (
    <div className="container">
      <Contacts type={type as FormType} />
    </div>
  );
};

export default ContactsPage;
