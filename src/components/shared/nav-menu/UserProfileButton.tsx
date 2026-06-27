"use client";

import { Card } from "@/components/shared";
import { useState } from "react";
import UserMenuContent from "./UserMenuContent";
import UserMenuTrigger from "./UserMenuTrigger";

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
          className="fixed inset-0 z-10 backdrop-blur-sm"
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
        className={`absolute right-[-1rem] top-[4.7rem] !z-40 flex max-h-[calc(100vh-8rem)] w-[300px] flex-col rounded-sm bg-white !px-3 ${toggleClass}`}
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
