"use client";

import { ButtonLink } from "@/components/shared";
import { usePathname } from "next/navigation";

type Props = {
  text: string;
  link: string;
  sameTab?: boolean;
  isActive?: boolean;
  level?: string;
};

const MenuLink = ({
  text,
  link,
  sameTab = true,
  isActive = false,
  level = "root",
}: Props) => {
  // const pathname = usePathname();
  // // TODO:
  // // 1. Przerobic sciezki: /form/create/, /form/list/, itd.
  // // 2. Porównać z wybranym elementem ścieki eby sprawdzić czy isActive
  // const isActive = pathname === link;
  // console.log(pathname);

  const borderClass =
    level === "sub"
      ? "border-[var(--color-accent)]"
      : "border-[var(--color-text-base)]";

  return (
    <li
      className={`shrink-0 ${
        isActive
          ? `border-b-[3px] ${borderClass}`
          : "border-b-[3px] border-transparent"
      }`}
    >
      <div className="text-base_bold">
        <ButtonLink
          message={text}
          link={link}
          target={sameTab ? "_self" : "_blank"}
          rel={"noopener noreferrer"}
        />
      </div>
    </li>
  );
};

export default MenuLink;
