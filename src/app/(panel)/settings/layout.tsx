import UserSettingsMenu from "@/components/pages/user-settings/UserSettingsMenu";

export default async function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {



    return (
        <div className="h-full flex flex-col">
            <div className="shrink-0 container">
                <div className="py-8">
                    <UserSettingsMenu />
                </div>

            </div>

            <section className="flex-1 overflow-y-auto">{children}</section>
        </div>
    );
}
