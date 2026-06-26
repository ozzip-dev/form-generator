"use client";

import { useState } from "react";
import LogoutButton from "@/components/pages/dashboard/LogoutButton";
import { Card, Icon } from "@/components/shared";
import { NavMenu } from "@/components/shared/nav-menu";
import Image from "next/image";
import { userProfileLinks } from "./userProfileLinks";

const links: any[] = [
  { text: "Instrukcja formularz", link: "/forms-doc" },
  { text: "Instrukcja protokół", link: "/protocols-doc" },
  { text: "Zarejestruj organizację", link: "/admin-contact" },
];

type Props = {
  isPublic?: boolean;
  userName: string;
};

const UserProfileButton = ({ isPublic, userName }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`inline-flex min-w-40 items-center truncate font-semibold ${
          isPublic ? "text-font_dark" : "text-white lg:pointer-events-none"
        }`}
        aria-label="User menu"
      >
        <div className="flex-1 truncate text-right">{userName}</div>

        <Icon
          icon={isPublic ? "user-profile-dark" : "user-profile-white"}
          size={30}
          className={`ml-4 ${isPublic ? "bg-font_dark" : "bg-white"}`}
        />
      </button>
      <div onMouseEnter={() => setOpen(true)}>
        <Card
          className={`fixed right-0 top-[2.7rem] z-40 min-w-40 !rounded-sm bg-white transition-all duration-200 ease-out ${
            open
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none translate-x-full opacity-0"
          } `}
        >
          <div className="px-16">
            <NavMenu links={links} depth={1} variant="mobile" />
            <div className="lg:hidden">{userName}</div>
            <div className="lg:hidden">
              <NavMenu links={userProfileLinks} depth={1} variant="mobile" />
            </div>

            <div className="py-10">
              <LogoutButton className="mx-auto w-fit !rounded-sm !border-accent !bg-accent px-10 !text-white hover:!border-accent hover:!bg-white hover:!text-accent" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfileButton;
