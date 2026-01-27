import LogoutButton from "@/components/pages/dashboard/dashboardTopBar/LogoutButton";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <>
      <header className="bg-accent flex justify-end p-6">
        <LogoutButton />
      </header>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </>
  );
}
