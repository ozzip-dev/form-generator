"use client";

import AppTopBar from "@/components/pages/shared/AppTopBar";
import { UserSerialized } from "@/types/user";
import { NavMenuLink } from "@/types/shared";

type Props = {
  user: UserSerialized | null;
};

const links: NavMenuLink[] = [
  { text: "Instrukcja formularz", link: "/forms-doc" },
  { text: "Instrukcja protokół", link: "/protocols-doc" },
  { text: "Zarejestruj organizację", link: "/admin-contact" },
];

export default function PublicTopBar({ user }: Props) {
  return (
    <div className="bg-white py-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <AppTopBar isPublic={true} links={links} user={user} />
    </div>
  );
}
