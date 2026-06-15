"use client";

import LogoutButton from "@/components/pages/dashboard/LogoutButton";
import { Card } from "@/components/shared";
import { NavMenu } from "@/components/shared/nav-menu";
import Image from "next/image";
import { userProfileLinks } from "./userProfileLinks";

type Props = {
  isPublic?: boolean;
  userName: string;
  isMenuOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

const UserProfileButton = ({
  isPublic,
  userName,
  isMenuOpen,
  onToggle,
  onClose,
}: Props) => {
  const menuVisibilityClass = isPublic ? "" : "lg:hidden";
  const toggleClass = isMenuOpen
    ? "scale-100 opacity-100"
    : "pointer-events-none scale-95 opacity-0";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`lg:truncate-none inline-flex min-w-40 items-center truncate font-semibold lg:max-w-none ${
          isPublic
            ? "cursor-pointer text-font_dark"
            : "cursor-pointer text-white lg:pointer-events-none lg:cursor-default"
        }`}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close user menu" : "Open user menu"}
      >
        <div className="flex-1 truncate text-right">{userName}</div>
        <Image
          src={
            isPublic
              ? "/icons/user-profile-dark.svg"
              : "/icons/user-profile-white.svg"
          }
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
          className="ml-3 size-12 shrink-0"
        />
      </button>

      <Card
        className={`absolute right-[-1rem] top-[4.7rem] z-40 mt-2 min-w-40 origin-top-right transform rounded-sm bg-white transition-all duration-200 ease-out ${menuVisibilityClass} ${toggleClass}`}
      >
        <div className="px-4" onClick={onClose}>
          {isPublic && (
            <NavMenu links={userProfileLinks} depth={1} variant="mobile" />
          )}

          <div className="py-10 lg:hidden">
            <LogoutButton className="mx-auto w-fit !rounded-sm !border-accent !bg-accent px-10 !text-white hover:!border-accent hover:!bg-white hover:!text-accent" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfileButton;
