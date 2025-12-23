import { ButtonLink } from "@/components/shared";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="shrink-0">
        <div className="w-fit">
          <ButtonLink message="Strona główna" link="/" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </>
  );
}
