import ButtonLink from "@/components/ui/buttons/ButtonLink";

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
