"use client";

import { NavMenuLink } from "@/types/shared";
import MenuLink from "./MenuLink";
import Icon from "../icons/Icon";

type Props = {
  links: NavMenuLink[];
  icon?: string;
};

const NavMenu = (props: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        {props.icon && (
          <Icon
            icon={props.icon}
            size={47}
            color="var(--color-accent_opacity)"
          />
        )}
      </div>
      <div>
        <ul className="flex items-center gap-[40px] py-[30px]">
          {props.links.map(({ text, link }, idx) => (
            <MenuLink key={idx} {...{ text, link }} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
