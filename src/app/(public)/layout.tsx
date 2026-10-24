import { Header } from "@/components/shared";
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
      <Header>
        <PublicTopBar user={user} />
      </Header>

      <main className="bg-bg-dark flex-1">{children}</main>

      <PublicFooter />
    </div>
  );
}
