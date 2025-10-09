import { redirect } from "next/navigation";
import { getUserCash } from "@/dataAccessLayer/queries";
import DashboardClientLayout from "@/components/pages/dashboardClientLayout/DashboardClientLayout";

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
      <DashboardClientLayout user={user} />
      <main>{children}</main>
    </>
  );
}
