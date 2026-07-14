import LogoutButton from "@/components/pages/dashboard/LogoutButton";
import { AppTopBar, Header } from "@/components/shared";
import { auth } from "@/lib/auth/auth";
import { userProfileLinks } from "@/lib/menuLinks";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PrivacyLayout({
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
        className="flex-1 overflow-y-auto pb-md"
        id="main-content"
        tabIndex={-1}
        role="main"
      >
        {children}
      </main>
    </div>
  );
}
