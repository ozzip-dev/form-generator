import { redirect } from "next/navigation";
import { getUser } from "@/dataAccessLayer/queries";
import DashboardClientLayout from "@/components/pages/DasboardClientLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <DashboardClientLayout user={user}>{children}</DashboardClientLayout>;
}
