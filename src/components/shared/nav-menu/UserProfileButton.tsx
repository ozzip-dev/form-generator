"use client";

import LogoutButton from "@/components/pages/dashboard/LogoutButton";
import { Button, Card, Icon } from "@/components/shared";
import { NavMenu } from "@/components/shared/nav-menu";
import { publicLinks, userProfileLinks } from "@/data/menuesLinks";
import { useState } from "react";
import UserMenuTrigger from "./UserMenuTrigger";
import UserMenuContent from "./UserMenuContent";

type Props = {
  isPublic?: boolean;
  userName: string;
};

const UserProfileButton = ({ isPublic, userName }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const toggleClass = isOpen
    ? "scale-100 opacity-100"
    : "pointer-events-none scale-95 opacity-0";

  return (
    <div className="relative">
      {isOpen && (
        <div
          className="fixed inset-0 top-[8.6rem] z-10 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
      <UserMenuTrigger
        isPublic={isPublic}
        userName={userName}
        isOpen={isOpen}
        onToggle={() => setOpen((v) => !v)}
      />

      <Card
        className={`absolute right-[-1rem] top-[4.7rem] !z-40 flex max-h-[calc(100vh-6rem)] min-w-40 flex-col rounded-sm bg-white ${toggleClass}`}
      >
        <UserMenuContent
          isPublic={isPublic}
          isLoged={!!userName}
          onClose={() => setOpen(false)}
        />
      </Card>
    </div>
  );
};

export default UserProfileButton;
