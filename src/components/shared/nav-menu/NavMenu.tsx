"use client";

import { NavMenuLink } from "@/types/shared";
import MenuLink from "./MenuLink";

type Props = {
  links: NavMenuLink[];
  icon?: string;
};

const NavMenu = (props: Props) => {
  return (
    <div className="flex justify-between">
      <div>{/* {TODO: add icon} */}</div>
      <div>
        <ul className="flex items-center w-1/2 gap-4">
          {props.links.map(({ text, link }, idx) => (
            <MenuLink key={idx} {...{ text, link }} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
