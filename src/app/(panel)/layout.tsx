import { redirect } from "next/navigation";
import { getUserCash } from "@/dataAccessLayer/queries";
import DashboardTopBar from "@/components/pages/dashboard/DashboardTopBar";
import DashboardMenu from "@/components/pages/dashboard/DashboardMenu";
import { Suspense } from "react";
import Loader from "@/components/ui/loaders/Loader";

function LayoutLoading() {
  return (
    <div className="flex items-center justify-center">
      <Loader size="lg" />
    </div>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserCash();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <header className="bg-gray-50">
        <DashboardTopBar user={user} />
        {user.role === "moderator" && <DashboardMenu />}
      </header>

      <main>
        <Suspense fallback={<LayoutLoading />}>{children}</Suspense>
      </main>
    </>
  );
}
