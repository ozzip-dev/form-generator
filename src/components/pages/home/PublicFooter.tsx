import Image from "next/image";
import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-gray py-6">
      <div className="items-center justify-center p-2 md:flex">
        <Image
          src="/images/UELogos.webp"
          alt="Loga"
          width={400}
          height={200}
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          loading="lazy"
          className="m-auto md:m-0"
        />
        <Image
          src="/images/TransferHubLogo.webp"
          alt="TransferHub logo"
          width={100}
          height={25}
          className="m-auto h-[25px] pl-2 md:m-0 md:border-l-2 md:border-zinc-400"
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          loading="lazy"
        />
      </div>

      <div className="text-center text-xs">
        {" "}
        <span>
          Produkt powstał w ramach projektu TransferHUB - inkubator innowacji
          społecznych w obszarze zatrudnienia,
        </span>{" "}
        <Link
          href="https://transferhub.pl/"
          className="text-xs text-accent_dark hover:underline hover:decoration-accent_dark"
          target="_blank"
        >
          www.transferhub.pl
        </Link>{" "}
      </div>

      <div className="text-center text-xs">
        <span className="mr-2">
          {" "}
          formypracy.org 2026 by Krzysztof Król, Paweł Wierciński jest objęte
          licencją
        </span>

        <Link
          href="https://creativecommons.org/licenses/by/4.0/deed.pl"
          className="text-xs text-accent_dark hover:underline hover:decoration-accent_dark"
          target="_blank"
        >
          CC BY 4.0
        </Link>
      </div>
    </footer>
  );
}
