"use client";

import LogoutButton from "@/components/pages/dashboard/LogoutButton";
import { Button, Card, Icon } from "@/components/shared";
import { NavMenu } from "@/components/shared/nav-menu";
import { publicLinks, userProfileLinks } from "@/data/menuesLinks";
import { useState } from "react";

type Props = {
  isPublic?: boolean;
  userName: string;
  isUser: boolean;
};

const UserProfileButton = ({ isPublic, userName, isUser }: Props) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleToggleUserMenu = () => {
    setIsUserMenuOpen((prev) => {
      const next = !prev;
      return next;
    });
  };

  const toggleClass = isUserMenuOpen
    ? "scale-100 opacity-100"
    : "pointer-events-none scale-95 opacity-0";

  const topLeftIcon = isUserMenuOpen ? "xmark" : "hamburger";

  return (
    <div className="relative">
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 top-[8.6rem] z-10 backdrop-blur-sm"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
      {isUser ? (
        <button
          type="button"
          onClick={handleToggleUserMenu}
          className={`lg:truncate-none inline-flex min-w-40 items-center truncate font-semibold lg:max-w-none ${
            isPublic
              ? "cursor-pointer text-font_dark"
              : "cursor-pointer text-white"
          }`}
          aria-expanded={isUserMenuOpen}
          aria-label={isUserMenuOpen ? "Close user menu" : "Open user menu"}
        >
          <div className="flex-1 truncate text-right">{userName}</div>
          <Icon
            icon={isPublic ? "user-profile-dark" : "user-profile-white"}
            size={30}
            className={`ml-4 ${isPublic ? "bg-font_dark" : "bg-white"}`}
          />
        </button>
      ) : (
        <Button
          type="button"
          className={
            isPublic ? "text-font_dark lg:hidden" : "text-white lg:hidden"
          }
          icon={
            <Icon
              icon={topLeftIcon}
              size={20}
              className={isPublic ? "bg-font_dark" : "bg-white"}
            />
          }
          onClickAction={handleToggleUserMenu}
          variant="ghost"
          ariaLabel={isUserMenuOpen ? "Zamknij menu" : "Otwórz menu"}
        />
      )}

      <Card
        className={`absolute right-[-1rem] top-[4.7rem] !z-40 flex max-h-[calc(100vh-6rem)] min-w-40 flex-col rounded-sm bg-white ${toggleClass}`}
      >
        <div
          className="overflow-y-auto px-4"
          onClick={() => setIsUserMenuOpen(false)}
        >
          {isPublic ? (
            <div className="lg:hidden">
              <NavMenu links={publicLinks} depth={1} variant="mobile" />
            </div>
          ) : (
            <NavMenu links={publicLinks} depth={1} variant="mobile" />
          )}
          {isPublic && isUser && (
            <NavMenu links={userProfileLinks} depth={1} variant="mobile" />
          )}

          {!isPublic && isUser && (
            <div className="lg:hidden">
              <NavMenu links={userProfileLinks} depth={1} variant="mobile" />
            </div>
          )}

          <div className="border-t p-4">
            <LogoutButton
              isUser={isUser}
              className="mx-auto w-fit !rounded-sm !border-accent !bg-accent px-10 !text-white hover:!border-accent hover:!bg-white hover:!text-accent"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfileButton;
