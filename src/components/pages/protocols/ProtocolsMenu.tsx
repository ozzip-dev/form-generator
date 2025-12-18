"use client";

import { ProtocolMenuItem } from "@/types/protocol";
import MenuLink from "../../shared/MenuLink";
import { useSafeURLParam } from "@/hooks/useSafeURLParam";

const ProtocolsMenu = () => {
  const protocolId = useSafeURLParam("protocolId");

  const protocolBasicItems: ProtocolMenuItem[] = [
    { text: "Dodaj protokół", link: "/protocols/add-protocol" },
    { text: "Lista protokołów", link: `/protocols/protocols-list` },
  ];
  const dataNavLinks = !protocolId
    ? protocolBasicItems
    : [
        { text: "Edytuj protokół", link: `/protocols/${protocolId}` },
        ...protocolBasicItems,
      ];

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
