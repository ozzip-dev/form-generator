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
          isPublic ? "!text-font-dark" : ""
        }`}
        aria-expanded={isOpen}
      >
        <Icon
          icon={"user-profile-dark"}
          size={25}
          className={`ml-4 ${isPublic ? "bg-font-dark" : "bg-font-dark"}`}
        />{" "}
        {userName}
      </Button>
    );
  }

  return (
    <Button
      className="lg:hidden"
      onClickAction={onToggle}
      variant="ghost"
      ariaLabel={isOpen ? "Zamknij menu" : "Otwórz menu"}
      aria-expanded={isOpen}
    >
      {" "}
      <Icon icon={menuIcon} size={30} className={"bg-font-dark"} />
    </Button>
  );
};

export default UserMenuTrigger;
