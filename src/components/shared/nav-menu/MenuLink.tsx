"use client";

import { ButtonLink } from "@/components/shared";
import { usePathname } from "next/navigation";

type Props = {
  text: string;
  link: string;
  sameTab?: boolean;
};

const MenuLink = ({ text, link, sameTab = true }: Props) => {
  const pathname = usePathname();
  // TODO:
  // 1. Przerobic sciezki: /form/create/, /form/list/, itd.
  // 2. Porównać z wybranym elementem ścieki eby sprawdzić czy isActive
  const isActive = pathname === link;

  return (
    <li
      className={`shrink-0 ${
        isActive ? "border-b-[3px] border-[var(--color-accent)]" : ""
      }`}
    >
      <ButtonLink
        message={text}
        link={link}
        target={sameTab ? "_self" : "_blank"}
        rel={"noopener noreferrer"}
      />
    </li>
  );
};

export default MenuLink;
