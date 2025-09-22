import ButtonLink from "@/components/ui/buttons/ButtonLInk";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-fit">
        <ButtonLink text="Wróć do strony głównej" link="/" />
      </div>

      {children}
    </>
  );
}
