"use client";

import { ButtonLink } from "@/components/shared";

type Props = {
  textColor?: string;
  text: string;
  link: string;
  sameTab?: boolean;
  isActive?: boolean;
  level?: string;
};

const MenuLink = ({
  textColor = "text-white",
  text,
  link,
  sameTab = true,
  isActive = false,
  level = "root",
}: Props) => {
  const isSub = level === "sub";
  const borderClass = isSub
    ? "border-accent text-accent"
    : "!text-font_dark !border-transparent";

  return (
    <li
      className={`shrink-0 ${
        isActive ? `border-b ${borderClass}` : "border-b border-transparent"
      } ${isSub ? "" : textColor}`}
    >
      <div className="text-base_bold">
        <ButtonLink
          message={text}
          link={link}
          target={sameTab ? "_self" : "externalWindow"}
        />
      </div>
    </li>
  );
};

export default MenuLink;
