import { redirect } from "next/navigation";
import { getUserCash } from "@/dataAccessLayer/queries";
import DashboardClientLayout from "@/components/pages/dashboardClientLayout/DashboardClientLayout";
import DashboardMenu from "@/components/pages/dashboardClientLayout/DashboardMenu";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserCash();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <header className="bg-gray-50">
        <DashboardClientLayout user={user} />
        {user.role === "moderator" && <DashboardMenu />}
      </header>

      <main>{children}</main>
    </>
  );
}
