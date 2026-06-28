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
      <Button
        variant="ghost"
        onClickAction={onToggle}
        className={`items-center font-semibold ${
          isPublic ? "!text-font_dark" : ""
        }`}
        aria-expanded={isOpen}
        message={userName}
        icon={
          <Icon
            icon={"user-profile-dark"}
            size={25}
            className={`ml-4 ${isPublic ? "bg-font_dark" : "bg-white"}`}
          />
        }
      />
    );
  }

  return (
    <Button
      className="lg:hidden"
      icon={<Icon icon={menuIcon} size={30} className={"bg-font_dark"} />}
      onClickAction={onToggle}
      variant="ghost"
      ariaLabel={isOpen ? "Zamknij menu" : "Otwórz menu"}
      aria-expanded={isOpen}
    />
  );
};

export default UserMenuTrigger;
