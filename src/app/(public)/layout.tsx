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
      <main className="flex-1">{children}</main>{" "}
      <footer className="items-center justify-center p-2 sm:flex">
        {" "}
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
      </footer>
    </div>
  );
}
