import DashboardMenu from "@/components/pages/dashboard/DashboardMenu";
import DashboardTopBar from "@/components/pages/dashboard/dashboardTopBar/DashboardTopBar";
import IsUserModal from "@/components/shared/IsUserModal";
import { UserContextProvider } from "@/context/UserContextProvider";
import { getUser } from "@/services/queries/getUser";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = getUser();

  return (
    <>
      <UserContextProvider userPromise={userPromise}>
        <IsUserModal />

        <header className="bg-gray-50">
          <DashboardTopBar />
          <DashboardMenu />
        </header>

        <main>{children}</main>
      </UserContextProvider>
    </>
  );
}
