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

  const newTabTarget = mobile && iSiOS() ? "_blank" : "externalWindow";

  return (
    <li
      className={`shrink-0 ${isSub ? "" : "text-" + textColor}`}
      style={{
        borderColor: isActive ? textColor : undefined,
      }}
    >
      <ButtonLink
        link={link}
        target={sameTab ? "_self" : newTabTarget}
        className={`hover:text-accent ${mobile && "py-8"}`}
      >
        <div
          className={`m-auto w-fit border-b ${isActive ? `border-accent text-accent` : "border-transparent"}`}
        >
          {text}
        </div>
      </ButtonLink>
    </li>
  );
};

export default MenuLink;
