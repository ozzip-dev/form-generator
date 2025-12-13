import { ProtocolMenuItem } from "@/types/protocol";
import MenuLink from "../../shared/MenuLink";

type Props = {
  protocolId?: string
}

const ProtocolsMenu = ({ protocolId }: Props) => {
  const protocolBasicItems: ProtocolMenuItem[] = [
    { text: "Dodaj protokół", link: '/protocols/add' },
    { text: "Lista protokołów", link: `/protocols/protocols-list` }
  ]

  const dataNavLinks = !protocolId ? protocolBasicItems : [
    { text: "Edytuj protokół", link: `/protocols/${protocolId}` },
    ...protocolBasicItems
  ]

  return (
    <div>
      <ul className="flex items-center justify-center">
        {dataNavLinks.map(({ text, link }) => (
          <MenuLink key={text} text={text} link={link} />
        ))}
      </ul>
    </div>
  );
};

export default ProtocolsMenu;
