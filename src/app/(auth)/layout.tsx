import { ButtonLink } from "@/components/shared";

export default function Layout({
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
