"use client";

import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { NavMenu } from "@/components/shared";
import { NavMenuLink } from "@/types/shared";

const protocolBasicItems: NavMenuLink[] = [
  { text: "Lista protokołów", link: `/protocols/list` },
  { text: "Dodaj protokół", link: "/protocols/add" },
];

const ProtocolsMenu = () => {
  const protocolId = useSafeURLParam("protocolId");

  const dataNavLinks = !protocolId
    ? protocolBasicItems
    : [
        ...protocolBasicItems,
        { text: "Edycja", link: `/protocols/${protocolId}` },
      ];

  return (
    <div className="relative py-8">
      <NavMenu links={dataNavLinks} icon="protocols" level="sub" />
    </div>
  );
};

export default ProtocolsMenu;
