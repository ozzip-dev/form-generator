"use client";

import { ButtonLink } from "@/components/shared";
import { iSiOS } from "@/helpers/appHelpers";

type Props = {
  textColor?: string;
  text: string;
  link: string;
  sameTab?: boolean;
  isActive?: boolean;
  level?: string;
  mobile?: boolean;
};

const MenuLink = ({
  textColor = "text-white",
  text,
  link,
  sameTab = true,
  isActive = false,
  level = "root",
  mobile,
}: Props) => {
  const isSub = level === "sub";

  const borderClass = isSub
    ? "border-accent text-accent"
    : mobile
      ? "!text-font_dark font-extrabold border-none"
      : "!border-" + textColor;

  const newTabTarget = mobile && iSiOS() ? "_blank" : "externalWindow";

  return (
    <li
      className={`shrink-0 ${
        isActive ? `border-b ${borderClass}` : "border-b border-transparent"
      } ${isSub ? "" : "text-" + textColor}`}
      style={{
        borderColor: isActive ? textColor : undefined,
      }}
    >
      <div className={`${mobile && isActive ? `font-bold` : "text-base_bold"}`}>
        <ButtonLink
          message={text}
          link={link}
          target={sameTab ? "_self" : newTabTarget}
          className={`${mobile && "py-10"}`}
        />
      </div>
    </li>
  );
};

export default MenuLink;
