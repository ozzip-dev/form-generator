import LogoutButton from "@/components/pages/dashboard/dashboardTopBar/LogoutButton";
import Header from "@/components/shared/Header";
import { UserContextProvider } from "@/context/UserContextProvider";
import { getUser } from "@/services/user-service";

export default async function UserFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className="h-full flex flex-col">
      <div className="shtink-0">
        <Header>
          <div className="ml-auto w-fit">
            <LogoutButton />
          </div>
        </Header>
      </div>

      <div className="flex-1 overflow-y-auto">


        <main className="container py-16">
          {children}
        </main>

      </div>

    </div>
  );
}
