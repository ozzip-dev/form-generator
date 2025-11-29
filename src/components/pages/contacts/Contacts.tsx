import { UserCommitteeInfo } from "@/types/user";
import ContactCommitteeItem from "./ContactCommitteeItem";
import { FormType } from "@/enums/form";
import { getTypeLabel } from "@/helpers/formHelpers";

type Props = {
  committees: UserCommitteeInfo[]
  type: FormType
}

const Contacts = ({ committees, type }: Props) => {
  return (
    <div>
      <div className="my-6 text-lg">
        Kontakty do komitetów związkowych, które mają doświadczenie w tworzeniu formularzy typu: <span className="font-black">{getTypeLabel(type)}</span>
      </div>
      <div
        className="
          *:grid *:grid-cols-[repeat(4,13rem)]
          items-center gap-2
          mb-1
        "
      >
        <div className="font-black">
          <div>Nazwa</div>
          <div>Związek zawodowy</div>
          <div>Telefon</div>
          <div>Email</div>
        </div>
        {committees.map((committee, i) => (
          <ContactCommitteeItem
            {...committee} 
            key={i}  
          />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
