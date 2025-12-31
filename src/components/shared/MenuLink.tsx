"use client";

import { ButtonLink } from "@/components/shared";
import { usePathname } from "next/navigation";

type Props = {
  text: string;
  link: string;
  sameTab?: boolean;
};

const MenuLink = ({ text, link, sameTab = false }: Props) => {
  const pathname = usePathname();
  // TODO: inaczej trzeba to zrobic, dla zagniezdzonych sciezek to nie działa
  const isActive = pathname === link;
  const isPreview = text === "Podgląd"; // TODO: add 'id' param to menu and check id == preview

  return (
    <li
      className={` ${
        isActive
          ? "border-b-2 border-blue-500"
          : "border-b-2 border-transparent"
      }`}
    >
      <ButtonLink
        message={text}
        link={link}
        // target={isPreview ? "_blank" : "_self"}
        // rel={isPreview ? "noopener noreferrer" : undefined}
        target={sameTab ? "_self" : "_blank"}
        rel={"noopener noreferrer"}
      />
    </li>
  );
};

export default MenuLink;
