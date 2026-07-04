"use client";

import { AppTopBar } from "@/components/shared";
import { UserSerialized } from "@/types/user";
import { publicLinks } from "@/helpers/menuLinks";

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
