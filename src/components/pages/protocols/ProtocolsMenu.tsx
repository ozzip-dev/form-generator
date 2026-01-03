"use client";

import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { NavMenu } from "@/components/shared/nav-menu";
import { NavMenuLink } from "@/types/shared";

const ProtocolsMenu = () => {
  const protocolId = useSafeURLParam("protocolId");

  const protocolBasicItems: NavMenuLink[] = [
    { text: "Dodaj protokół", link: "/protocols/add-protocol" },
    { text: "Lista protokołów", link: `/protocols/protocols-list` },
  ];
  const dataNavLinks = !protocolId
    ? protocolBasicItems
    : [
        { text: "Edytuj protokół", link: `/protocols/${protocolId}` },
        ...protocolBasicItems,
      ];

  return <NavMenu links={dataNavLinks} icon="protocols" />;
};

export default ProtocolsMenu;
