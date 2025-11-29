import { UserCommitteeInfo, UserSerialized } from "@/types/user";
import ContactCommitteeItem from "./ContactCommitteeItem";
import { FormType } from "@/enums/form";
import { getTypeLabel } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";
import { getFormsByType } from "@/services/form-service";
import { getCommitteeMembers } from "@/services/user-service";
import { serializeForm } from "@/lib/serialize-utils";
import CommitteeHeaders from "./CommitteeContactsHeaders";

type Props = {
  committees: UserCommitteeInfo[]
  type: FormType
}

const Contacts = async ({ committees, type }: Props) => {
  const getForms = async (committee: UserCommitteeInfo): Promise<FormSerialized[]> => {
    "use server"
    const committeeUsers: UserSerialized[] = await getCommitteeMembers(committee)
    const userIds: string[] = committeeUsers.map(({ _id }) => _id.toString())
    const forms = await getFormsByType(type)
    return forms
      .map((form) => serializeForm(form))
      .filter(({ createdBy }) => createdBy && userIds.includes(createdBy.toString()))
  }

  return (
    <div className="px-8">
      <div className="my-6 text-lg">
        <span>Kontakty do komitetów związkowych, które mają doświadczenie w tworzeniu formularzy typu:</span>{" "}
        <span className="font-black">{getTypeLabel(type)}</span>
      </div>
      <div
        className="
          *:grid *:grid-cols-[repeat(5,12rem)]
          *:items-center
        "
      >
        <CommitteeHeaders />

        {committees.map((committee, i) => (
          <ContactCommitteeItem
            {...{committee, getForms}} 
            key={i}

          />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
