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
        className={`!text-font-dark items-center font-semibold`}
        aria-expanded={isOpen}
      >
        <Icon
          icon={"user-profile-dark"}
          size={25}
          className={`"bg-font-dark" ml-4`}
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
