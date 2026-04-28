import Link from "next/link";
import Image from "next/image";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="sticky top-0">menu</div>
      <main className="">{children}</main>{" "}
      <footer className="bg-font_dark">
        <div className="container py-20 text-white">
          <div>
            <p>OZZ Inicjatywa Pracownicza</p>
            <p>Komisja Krajowa</p>
            <p>ul. Kościelna 4/1a, 60-538</p>
            <p>REGON:634611023</p>
            <p>NIP:779-22-38-665</p>
          </div>
        </div>{" "}
        <div className="items-center justify-center bg-white p-2 sm:flex">
          <Image
            src="/images/UELogos.webp"
            alt="Loga"
            width={400}
            height={200}
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
            loading="lazy"
          />
          <Image
            src="/images/TransferHubLogo.webp"
            alt="TransferHub logo"
            width={100}
            height={25}
            className="xs:w-auto m-auto h-[25px] pl-2 sm:m-0 sm:border-l-2 sm:border-zinc-400"
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
            loading="lazy"
          />
        </div>
      </footer>
    </div>
  );
}
