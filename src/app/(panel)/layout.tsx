import { redirect } from "next/navigation";
import { getUser } from "@/dataAccessLayer/queries";
import DashboardClientLayout from "@/components/pages/dashboardClientLayout/DashboardClientLayout";
import { UserProvider } from "@/context/UserProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <UserProvider user={user}>
      <DashboardClientLayout user={user}>{children}</DashboardClientLayout>;
    </UserProvider>
  );
}
