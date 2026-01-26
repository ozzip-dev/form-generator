import { ButtonLink } from "@/components/shared";
import BottomShadow from "@/components/shared/BottomShadow";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col">
      <header className="shrink-0 bg-accent py-6 relative">
        <div className="container">
          <div className="w-fit bg-white rounded-full text-accent py-1 px-4">
            <ButtonLink message="Strona główna" link="/" />
          </div>
        </div>
        < BottomShadow />
      </header>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
