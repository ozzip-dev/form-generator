import { UserCommitteeInfo, UserSerialized } from "@/types/user";
import { FormType } from "@/enums/form";
import { getTypeLabel } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";
import { getFormsByType } from "@/services/form-service";
import { getCommitteeMembers } from "@/services/user-service";
import { serializeForm } from "@/lib/serialize-utils";
import ContactList from "./ContactList";

type Props = {
  committees: UserCommitteeInfo[];
  type: FormType;
};

const Contacts = async ({ committees, type }: Props) => {
  const getForms = async (
    committee: UserCommitteeInfo
  ): Promise<FormSerialized[]> => {
    "use server";
    const committeeUsers: UserSerialized[] = await getCommitteeMembers(
      committee
    );
    const userIds: string[] = committeeUsers.map(({ _id }) => _id.toString());
    const forms = await getFormsByType(type);
    return forms
      .map((form) => serializeForm(form))
      .filter(
        ({ createdBy }) => createdBy && userIds.includes(createdBy.toString())
      );
  };

  return (
    <>
      <div className="my-6 text-lg">
        <span>Organizacje, które utworzyły formularz typu</span>{" "}
        <span className="font-bold">{getTypeLabel(type)}</span>
      </div>

      <ContactList {...{ committees, getForms }} />
    </>
  );
};

export default Contacts;
