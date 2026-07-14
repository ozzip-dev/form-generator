import LogoutButton from "@/components/pages/dashboard/LogoutButton";
import { AppTopBar, Header } from "@/components/shared";
import { Suspense } from "react";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <div className="flex h-screen flex-col">
      <Header>
        <AppTopBar isPublic={false} links={[]} user={session.user} />
      </Header>

      <main
        className="container py-16"
        id="main-content"
        tabIndex={-1}
        role="main"
      >
        {children}
      </main>
    </div>
  );
}
