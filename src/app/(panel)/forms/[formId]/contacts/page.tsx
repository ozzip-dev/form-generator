import Contacts from "@/components/pages/contacts/Contacts";
import { FormType } from "@/enums/form";
import { getFormById } from "@/services/form-service";
import { getUsersWithFormType } from "@/services/user-service";
import { IUser, UserCommitteeInfo } from "@/types/user";

type Props = { params: Promise<{ formId: string }> };

const ContactsPage = async (props: Props) => {
  const { formId } = await props.params;
  const { type } = await getFormById(formId);

  const usersWithSameTypeForms: IUser[] = await getUsersWithFormType(
    type as FormType
  );
  const userCommittees: UserCommitteeInfo[] = usersWithSameTypeForms.map(
    ({ committeeEmail, committeeName, committeePhone, committeeUnion }) => ({
      committeeEmail,
      committeeName,
      committeePhone,
      committeeUnion,
    })
  );

  return (
    <div className="container">
      <Contacts committees={userCommittees} type={type as FormType} />
    </div>
  );
};

export default ContactsPage;
