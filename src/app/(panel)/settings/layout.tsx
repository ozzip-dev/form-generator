import UserSettingsMenu from "@/components/pages/user-settings/UserSettingsMenu";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 bg-white py-3">
        <div className="container">
          <UserSettingsMenu />
        </div>
      </div>

      <section className="flex-1 overflow-y-auto">{children}</section>
    </div>
  );
}
