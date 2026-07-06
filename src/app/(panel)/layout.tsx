import DashboardTopBar from "@/components/pages/dashboard/dashboard-top-bar/DashboardTopBar";
import DashboardMenu from "@/components/pages/dashboard/DashboardMenu";
import {
  SuspenseErrorBoundary,
  Header,
  IsUserModal,
} from "@/components/shared";
import { LoaderContextProvider } from "@/context/LoaderContextProvider";
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
    <LoaderContextProvider>
      <ModalContextProvider>
        <UserContextProvider userPromise={userPromise}>
          {user && isModerator(user) && <IsUserModal />}
          <div className="flex h-full flex-col">
            <Header>
              <SuspenseErrorBoundary size="sm" errorMessage="Brak logowania">
                <DashboardMenu />
              </SuspenseErrorBoundary>
            </Header>
            <main
              className="flex-1 overflow-y-auto"
              id="main-content"
              tabIndex={-1}
              role="main"
            >
              {children}
            </main>
          </div>
        </UserContextProvider>
      </ModalContextProvider>
    </LoaderContextProvider>
  );
}
