import DashboardTopBar from "@/components/pages/dashboard/dashboardTopBar/DashboardTopBar";
import UserSettings from "@/components/pages/user-settings/UserSettings";
import UserSettingsMenu from "@/components/pages/user-settings/UserSettingsMenu";
import { SuspenseErrorBoundary } from "@/components/shared";
import BottomShadow from "@/components/shared/BottomShadow";
import Header from "@/components/shared/Header";
import IsUserModal from "@/components/shared/IsUserModal";
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
          <div className="h-full flex flex-col">
            <Header>
              <SuspenseErrorBoundary size="sm" errorMessage="Brak logowania">
                <DashboardTopBar />
              </SuspenseErrorBoundary>
            </Header>
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </UserContextProvider>
      </ModalContextProvider>
    </LoaderContextProvider>
  );
}
