import DashboardMenu from "@/components/pages/dashboard/DashboardMenu";
import DashboardTopBar from "@/components/pages/dashboard/dashboardTopBar/DashboardTopBar";
import { SuspenseErrorBoundary } from "@/components/shared";
import IsUserModal from "@/components/shared/IsUserModal";
import { UserContextProvider } from "@/context/UserContextProvider";
import { getUser } from "@/services/user-service";

export default function DashboardLayout({
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
          <SuspenseErrorBoundary size="sm" errorMessage="Brak logowania">
            <DashboardTopBar />
            <DashboardMenu />
          </SuspenseErrorBoundary>
        </header>

        <main>{children}</main>
      </UserContextProvider>
    </>
  );
}
