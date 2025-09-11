import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Link href="/" aria-label="go home">
        Wróć do strony głównej
      </Link>
      {children}
    </>
  );
}
