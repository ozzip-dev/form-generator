"use client";

import { Card } from "@/components/shared";
import { useState } from "react";
import { createPortal } from "react-dom";
import UserMenuContent from "./UserMenuContent";
import UserMenuTrigger from "./UserMenuTrigger";

type Props = {
  isPublic?: boolean;
  userName: string;
};

const UserProfileButton = ({ isPublic, userName }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const toggleClass = isOpen
    ? "scale-100 block"
    : "pointer-events-none scale-95 hidden";

  return (
    <div className="relative">
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-10 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />,
          document.body,
        )}
      <UserMenuTrigger
        isPublic={isPublic}
        userName={userName}
        isOpen={isOpen}
        onToggle={() => setOpen((prev) => !prev)}
      />

      <Card
        className={`absolute right-[-1rem] top-[4.7rem] !z-40 flex max-h-[calc(100vh-8rem)] w-[300px] flex-col rounded-sm bg-white !px-3 ${toggleClass}`}
      >
        <UserMenuContent
          isPublic={isPublic}
          isLoggedIn={!!userName}
          onClose={() => setOpen(false)}
        />
      </Card>
    </div>
  );
};

export default UserProfileButton;
