"use client";

import { NavMenuLink } from "@/types/shared";
import MenuLink from "./MenuLink";
import Icon from "../icons/Icon";
import { usePathname } from "next/navigation";

type Props = {
  links: NavMenuLink[];
  icon?: string;
  depth?: number;
  variant?: "desktop" | "mobile";
  level?: "root" | "sub";
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
    <>
      {props.variant === "mobile" ? (
        <div className="p-4">
          <ul className="flex flex-col gap-8">
            {props.links.map(({ text, link, sameTab }) => (
              <MenuLink
                key={link}
                {...{ text, link }}
                isActive={isLinkActive(link)}
                sameTab={sameTab}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex items-center justify-center md:justify-between">
          <div>
            {props.icon && (
              <Icon
                icon={props.icon}
                size={27}
                color="var(--color-accent)"
                className="hidden md:block"
              />
            )}
          </div>
          <ul className="flex items-center gap-6 sm:gap-10">
            {props.links.map(({ text, link, sameTab }) => (
              <MenuLink
                key={link}
                {...{ text, link }}
                level={props.level}
                isActive={isLinkActive(link)}
                sameTab={sameTab}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default NavMenu;
