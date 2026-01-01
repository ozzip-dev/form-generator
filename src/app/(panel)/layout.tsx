import DashboardTopBar from "@/components/pages/dashboard/dashboardTopBar/DashboardTopBar";
import { SuspenseErrorBoundary } from "@/components/shared";
import IsUserModal from "@/components/shared/IsUserModal";
import { ModalContextProvider } from "@/context/ModalContextProvider";
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
      <ModalContextProvider>
        <UserContextProvider userPromise={userPromise}>
          <IsUserModal />
          <div className="h-full flex flex-col">
            <header className="shrink-0 bg-accent_opacity">
              <SuspenseErrorBoundary size="sm" errorMessage="Brak logowania">
                <DashboardTopBar />
              </SuspenseErrorBoundary>
            </header>
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </UserContextProvider>
      </ModalContextProvider>
    </>
  );
}
