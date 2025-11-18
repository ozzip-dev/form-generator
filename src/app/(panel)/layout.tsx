import DashboardTopBar from "@/components/pages/dashboard/dashboardTopBar/DashboardTopBar";
import DashboardMenu from "@/components/pages/dashboard/DashboardMenu";
import { requireUser } from "@/dataAccessLayer/queries";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <>
      <header className="bg-gray-50">
        <DashboardTopBar user={user} />
        {user?.role === "moderator" && <DashboardMenu />}
      </header>

      <main>{children}</main>
    </>
  );
}
