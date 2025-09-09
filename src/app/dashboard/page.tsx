import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from "@/components/pages/Dashboard";
import { auth } from "@/lib/auth";
import { IUser } from "@/types/user";

const PageDashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return <Dashboard user={user as IUser} />;
};
export default PageDashboard;
