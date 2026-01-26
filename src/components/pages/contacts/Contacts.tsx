import { IUser, UserCommitteeInfo, UserSerialized } from "@/types/user";
import { FormType } from "@/enums/form";
import { FormSerialized } from "@/types/form";
import { getFormsByType } from "@/services/form-service";
import {
  getCommitteeMembers,
  getUsersWithFormType,
} from "@/services/user-service";
import { serializeForm } from "@/lib/serialize-utils";
import ContactList from "./ContactList";

type Props = {
  type: FormType;
};

const Contacts = async ({ type }: Props) => {
  const getForms = async (
    committee: UserCommitteeInfo,
    formType: FormType,
  ): Promise<FormSerialized[]> => {
    "use server";
    const committeeUsers: UserSerialized[] =
      await getCommitteeMembers(committee);

    const userIds: string[] = committeeUsers.map(({ _id }) => _id.toString());
    const forms = await getFormsByType(formType);

    return forms
      .map((form) => serializeForm(form))
      .filter(
        ({ createdBy }) => createdBy && userIds.includes(createdBy.toString()),
      );
  };

  const getUserCommittees = async (
    formType: FormType,
  ): Promise<UserCommitteeInfo[]> => {
    "use server";
    const usersWithSameTypeForms: IUser[] = await getUsersWithFormType(
      formType as FormType,
    );

    const userCommittees: UserCommitteeInfo[] = usersWithSameTypeForms.map(
      ({ committeeEmail, committeeName, committeePhone, committeeUnion }) => ({
        committeeEmail,
        committeeName,
        committeePhone,
        committeeUnion,
      }),
    );

    return userCommittees;
  };

  return <ContactList {...{ getUserCommittees, getForms, type }} />;
};

export default Contacts;
