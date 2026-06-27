"use client";

import AppTopBar from "@/components/shared/nav-menu/AppTopBar";
import { UserSerialized } from "@/types/user";
import { publicLinks } from "@/data/menuesLinks";

type Props = {
  user: UserSerialized | null;
};

export default function PublicTopBar({ user }: Props) {
  return (
    <div className="bg-white py-6">
      <AppTopBar isPublic={true} links={publicLinks} user={user} />
    </div>
  );
}
