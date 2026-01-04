import DashboardTopBar from "@/components/pages/dashboard/dashboardTopBar/DashboardTopBar";
import { SuspenseErrorBoundary } from "@/components/shared";
import IsUserModal from "@/components/shared/IsUserModal";
import { ModalContextProvider } from "@/context/ModalContextProvider";
import { UserContextProvider } from "@/context/UserContextProvider";
import { isModerator } from "@/lib/utils";
import { getUser } from "@/services/user-service";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = getUser();
  const user = await userPromise;

  return (
    <>
      <ModalContextProvider>
        <UserContextProvider userPromise={userPromise}>
          {user && isModerator(user) && <IsUserModal />}
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
