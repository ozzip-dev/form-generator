import { ButtonLink } from "@/components/shared";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col">
      <header className="shrink-0 bg-accent_opacity ">
        <div className="container">
          <div className="w-fit">
            <ButtonLink message="Strona główna" link="/" />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
