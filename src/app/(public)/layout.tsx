import Header from "@/components/shared/Header";
import PublicTopBar from "@/components/pages/home/PublicTopBar";
import { getLoggedInUser } from "@/services/user-service";
import PublicFooter from "@/components/pages/home/PublicFooter";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <Header
        className="sticky top-0 z-20 bg-white !py-0 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
        showBottomGradient={false}
      >
        <PublicTopBar user={user} />
      </Header>

      <main className="flex-1">{children}</main>

      <PublicFooter />
    </div>
  );
}
