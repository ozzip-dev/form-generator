import Contacts from "@/components/pages/contacts/Contacts";
import { FormType } from "@/enums/form";
import { getFormById } from "@/services/form-service";

type Props = { params: Promise<{ formId: string }> };

const ContactsPage = async (props: Props) => {
  const { formId } = await props.params;
  const { type } = await getFormById(formId);

  return (
    <div className="container">
      <Contacts type={type as FormType} />
    </div>
  );
};

export default ContactsPage;
