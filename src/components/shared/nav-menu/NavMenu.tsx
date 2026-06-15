"use client";

import Image from "next/image";
import { NavMenuLink } from "@/types/shared";
import MenuLink from "./MenuLink";
import { usePathname } from "next/navigation";

type Props = {
  links: NavMenuLink[];
  icon?: string;
  depth?: number;
  variant?: "desktop" | "mobile";
  level?: "root" | "sub";
  textColor?: string;
};

const getPathnameSegments = (pathname: string): string[] =>
  pathname.split("/").slice(1);

const NavMenu = (props: Props) => {
  const pathname = usePathname();
  const pathSegments = getPathnameSegments(pathname) || [];
  const { depth = pathSegments.length, textColor } = props;

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
              <div className="border-b py-10 last:border-none" key={link}>
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
              <Image
                src={`/icons/${props.icon}.svg`}
                alt=""
                aria-hidden="true"
                width={42}
                height={42}
                className="hidden md:block"
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
                  textColor={textColor}
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
