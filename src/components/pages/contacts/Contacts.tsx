import { UserCommitteeInfo, UserSerialized } from "@/types/user";
import ContactCommitteeItem from "./ContactCommitteeItem";
import { FormType } from "@/enums/form";
import { getTypeLabel } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";
import { getFormsByType } from "@/services/form-service";
import { getCommitteeMembers } from "@/services/user-service";
import { serializeForm } from "@/lib/serialize-utils";

type Props = {
  committees: UserCommitteeInfo[]
  type: FormType
}

const Contacts = async ({ committees, type }: Props) => {
  const getForms = async (committee: UserCommitteeInfo): Promise<FormSerialized[]> => {
    "use server"
    const committeeUsers: UserSerialized[] = await getCommitteeMembers(committee)
    const userIds: string[] = committeeUsers.map(({ _id }) => _id.toString())
    console.log(userIds)
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
        <div className="font-black">
          <div>Nazwa</div>
          <div>Związek zawodowy</div>
          <div>Telefon</div>
          <div>Email</div>
          <div></div>
        </div>
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
