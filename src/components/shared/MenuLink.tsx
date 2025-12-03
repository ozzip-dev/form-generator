"use client";

import { ButtonLink } from "@/components/shared";
import { usePathname } from "next/navigation";

type Props = {
  text: string;
  link: string;
};

const MenuLink = ({ text, link }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === link;
  const isPreview = text === "Podgląd" // TODO: add 'id' param to menu and check id == preview

  return (
    <li
      className={`me-1 pb-1 ${
        isActive
          ? "border-b-2 border-blue-500"
          : "border-b-2 border-transparent"
      }`}
    >
      <ButtonLink
        message={text}
        link={link}
        target={isPreview ? "_blank" : "_self"}
        rel={isPreview ? "noopener noreferrer" : undefined}
      />
    </li>
  );
};

export default MenuLink;
