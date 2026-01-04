"use client";

import { NavMenuLink } from "@/types/shared";
import MenuLink from "./MenuLink";
import Icon from "../icons/Icon";
import { usePathname } from "next/navigation";

type Props = {
  links: NavMenuLink[];
  icon?: string;
  depth?: number;
};

const getPathnameSegments = (pathname: string): string[] =>
  pathname.split("/").slice(1);

const NavMenu = (props: Props) => {
  const pathname = usePathname();
  const pathSegments = getPathnameSegments(pathname) || [];
  const { depth = pathSegments.length } = props;

  const getValidatedSegments = (segments: string[]): string =>
    segments.slice(0, depth).join("/");

  const isLinkActive = (linkText: string): boolean => {
    const segmentsToCheck = getValidatedSegments(pathSegments);
    const linkSegments = getValidatedSegments(getPathnameSegments(linkText));
    return segmentsToCheck === linkSegments;
  };

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
        <ul className="flex items-center gap-[40px]">
          {props.links.map(({ text, link }, idx) => (
            <MenuLink
              key={idx}
              {...{ text, link }}
              isActive={isLinkActive(link)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
