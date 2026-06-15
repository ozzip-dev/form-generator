"use client";

import LogoutButton from "@/components/pages/dashboard/LogoutButton";
import { BackToHomeLink, ButtonLink } from "@/components/shared";
import TopBarHamburgerMenu from "./TopBarHamburgerMenu";
import { NavMenu } from "@/components/shared/nav-menu";
import { NavMenuLink } from "@/types/shared";
import { UserSerialized } from "@/types/user";
import { useState } from "react";
import UserProfileButton from "./UserProfileButton";

type Props = {
  isPublic: boolean;
  links: NavMenuLink[];
  user: UserSerialized | null;
};

export default function AppTopBar({ isPublic, links, user }: Props) {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleToggleHamburgerMenu = () => {
    setIsHamburgerMenuOpen((prev) => {
      const next = !prev;
      if (next) setIsUserMenuOpen(false);
      return next;
    });
  };

  const handleToggleUserMenu = () => {
    setIsUserMenuOpen((prev) => {
      const next = !prev;
      if (next) setIsHamburgerMenuOpen(false);
      return next;
    });
  };

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex min-w-0 items-center gap-6 lg:gap-8">
        <TopBarHamburgerMenu
          isPublic={isPublic}
          links={links}
          isMenuOpen={isHamburgerMenuOpen}
          onToggle={handleToggleHamburgerMenu}
          onClose={() => setIsHamburgerMenuOpen(false)}
        />

        {isHamburgerMenuOpen && (
          <div
            className="fixed inset-0 top-[8.6rem] z-10 backdrop-blur-sm lg:hidden"
            onClick={() => setIsHamburgerMenuOpen(false)}
          />
        )}

        {isUserMenuOpen && (
          <div
            className="fixed inset-0 top-[8.6rem] z-10 backdrop-blur-sm lg:hidden"
            onClick={() => setIsUserMenuOpen(false)}
          />
        )}

        <BackToHomeLink isDark={isPublic} />

        <div className="hidden lg:block">
          <NavMenu
            links={links}
            depth={1}
            textColor={isPublic ? "text-font_dark" : undefined}
          />
        </div>
      </div>

      {user ? (
        <div className="ml-auto flex shrink-0 items-center gap-3 lg:gap-6 xl:gap-10">
          <UserProfileButton
            isPublic={isPublic}
            userName={user.name}
            isMenuOpen={isUserMenuOpen}
            onToggle={handleToggleUserMenu}
            onClose={() => setIsUserMenuOpen(false)}
          />
          <div className="hidden lg:block">
            <LogoutButton />
          </div>
        </div>
      ) : (
        <>
          <div className="ml-auto hidden shrink-0 items-center gap-6 lg:flex xl:gap-10">
            <ButtonLink
              message="Zaloguj"
              link="/login"
              variant="primary-rounded"
              className={
                isPublic
                  ? "min-w-[11.6rem] !rounded-full !border-[#cf0000] !bg-[#cf0000] px-12 py-3 text-base text-white hover:!border-accent hover:!bg-white hover:!text-[#cf0000]"
                  : "!bg-white !text-accent hover:!border-white hover:!bg-accent hover:!text-white"
              }
            />
          </div>

          <ButtonLink
            message="Zaloguj"
            link="/login"
            variant="primary-rounded"
            className={
              isPublic
                ? "ml-auto !rounded-full !border-[#cf0000] !bg-[#cf0000] px-8 py-2 text-white hover:!border-accent hover:!bg-white hover:!text-[#cf0000] lg:hidden"
                : "ml-auto !bg-white !text-accent hover:!border-white hover:!bg-accent hover:!text-white lg:hidden"
            }
          />
        </>
      )}
    </div>
  );
}
