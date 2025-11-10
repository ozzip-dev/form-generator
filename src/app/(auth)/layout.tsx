import { ButtonLink } from "@/components/shared";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-fit">
        <ButtonLink message="Strona główna" link="/" />
      </div>

      {children}
    </>
  );
}
