"use client";

import { ButtonLink } from "@/components/shared";

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
  const borderClass =
    level === "sub"
      ? "border-accent text-accent"
      : "border-font_dark text-white";

  return (
    <li
      className={`shrink-0 ${
        isActive ? `border-b ${borderClass}` : "border-b border-transparent"
      }`}
    >
      <div className="text-base_bold">
        <ButtonLink
          message={text}
          link={link}
          target={sameTab ? "_self" : "_blank"}
          rel="noopener noreferrer"
        />
      </div>
    </li>
  );
};

export default MenuLink;
