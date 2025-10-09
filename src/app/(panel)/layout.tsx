import { redirect } from "next/navigation";
import { getUserCash } from "@/dataAccessLayer/queries";
import DashboardClientLayout from "@/components/pages/dashboardClientLayout/DashboardClientLayout";
import DashboardMenu from "@/components/pages/dashboardClientLayout/DashboardMenu";
import { Suspense } from "react";
import Loader from "@/components/ui/Loader";

function LayoutLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader size="lg" />
        <p className="mt-4 text-gray-600">Ładowanie panelu...</p>
      </div>
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
        <DashboardClientLayout user={user} />
        {user.role === "moderator" && <DashboardMenu />}
      </header>

      <main>
        <Suspense fallback={<LayoutLoading />}>{children}</Suspense>
      </main>
    </>
  );
}
