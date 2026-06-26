"use client";

import { Button, Icon } from "@/components/shared";

type Props = {
  isPublic?: boolean;
  userName: string;
  isOpen: boolean;
  onToggle: () => void;
};

const UserMenuTrigger = ({ isPublic, userName, isOpen, onToggle }: Props) => {
  const menuIcon = isOpen ? "xmark" : "hamburger";

  if (userName) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className={`lg:truncate-none inline-flex min-w-40 items-center truncate font-semibold lg:max-w-none ${
          isPublic
            ? "cursor-pointer text-font_dark"
            : "cursor-pointer text-white"
        }`}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close user menu" : "Open user menu"}
      >
        <div className="flex-1 truncate text-right">{userName}</div>
        <Icon
          icon={isPublic ? "user-profile-dark" : "user-profile-white"}
          size={30}
          className={`ml-4 ${isPublic ? "bg-font_dark" : "bg-white"}`}
        />
      </button>
    );
  }

  return (
    <Button
      type="button"
      className="lg:hidden"
      icon={
        <Icon
          icon={menuIcon}
          size={30}
          className={isPublic ? "bg-font_dark" : "bg-white"}
        />
      }
      onClickAction={onToggle}
      variant="ghost"
      ariaLabel={isOpen ? "Zamknij menu" : "Otwórz menu"}
    />
  );
};

export default UserMenuTrigger;
