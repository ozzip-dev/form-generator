"use client";

import { AppTopBar } from "@/components/shared";
import { UserSerialized } from "@/types/user";
import { publicLinks } from "@/lib/menuLinks";

type Props = {
  user: UserSerialized | null;
};

export default function PublicTopBar({ user }: Props) {
  return <AppTopBar isPublic={true} links={publicLinks} user={user} />;
}
