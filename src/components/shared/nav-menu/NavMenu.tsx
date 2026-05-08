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
        <nav className="m-auto w-fit text-font_dark">
          <ul className="flex flex-col">
            {props.links.map(({ text, link, sameTab }) => (
              <div className="border-b py-16 last:border-none" key={link}>
                <MenuLink
                  {...{ text, link }}
                  isActive={isLinkActive(link)}
                  sameTab={sameTab}
                  textColor="text-font_light"
                  mobile={true}
                />
              </div>
            ))}
          </ul>
        </nav>
      ) : (
        <div className="flex items-center justify-center md:justify-between">
          <div>
            {props.icon && (
              <Icon
                icon={props.icon}
                size={27}
                className="hidden bg-accent md:block"
              />
            )}
          </div>
          <nav>
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
          </nav>
        </div>
      )}
    </>
  );
};

export default NavMenu;
