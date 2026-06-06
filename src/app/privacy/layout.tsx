import LogoutButton from "@/components/pages/dashboard/LogoutButton";
import Header from "@/components/shared/Header";
import { auth } from "@/lib/auth/auth";
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
      <div className="shrink-0">
        <Header>
          <div className="ml-auto w-fit">
            <LogoutButton />
          </div>
        </Header>
      </div>
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
