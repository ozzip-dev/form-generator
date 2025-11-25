import DashboardTopBar from "@/components/pages/dashboard/dashboardTopBar/DashboardTopBar";
import DashboardMenu from "@/components/pages/dashboard/DashboardMenu";
import { requireUser } from "@/services/queries/requireUser";
import { UserContextProvider } from "@/context/UserContextProvider";
import IsUserModal from "@/components/shared/IsUserModal";
import { getUser } from "@/services/queries/getUser";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const userPromise = getUser();

  return (
    <>
      <UserContextProvider userPromise={userPromise}>
        <IsUserModal />

        <header className="bg-gray-50">
          <DashboardTopBar />
          {user?.role === "moderator" && <DashboardMenu />}
        </header>

        <main>{children}</main>
      </UserContextProvider>
    </>
  );
}
