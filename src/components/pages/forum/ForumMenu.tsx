"use client";

import { useSafeURLParam } from "@/hooks/useSafeURLParam";
import { NavMenu } from "@/components/shared";
import { NavMenuLink } from "@/types/shared";

const ForumMenu = () => {
  const topicId = useSafeURLParam("topicId");

  const protocolBasicItems: NavMenuLink[] = [
    { text: "Lista tematów", link: `/forum/list` },
    { text: "Dodaj temat", link: "/forum/add" },
  ];
  const dataNavLinks = !topicId
    ? protocolBasicItems
    : [{ text: "Edycja", link: `/forum/${topicId}` }, ...protocolBasicItems];

  return (
    <div className="py-8">
      <NavMenu links={dataNavLinks} icon="forum" level="sub" />
    </div>
  );
};

export default ForumMenu;
