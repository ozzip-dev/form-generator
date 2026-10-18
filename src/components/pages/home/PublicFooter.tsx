import { ButtonLink } from "@/components/shared";
import Image from "next/image";
import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-gray pb-10 pt-6">
      <div className="container text-font_light">
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
          <ButtonLink
            link="https://transferhub.pl"
            variant="underline"
            target="_blank"
            message="www.transferhub.pl"
            className="inline text-xs"
          />
        </div>
        <div className="text-center text-xs">
          <span className="mr-2">
            {" "}
            formypracy.org 2026 by Krzysztof Król, Paweł Wierciński jest objęte
            licencją
          </span>

          <ButtonLink
            link="https://creativecommons.org/licenses/by/4.0/deed.pl"
            variant="underline"
            target="_blank"
            message="CC BY 4.0"
            className="inline text-xs"
          />
        </div>{" "}
      </div>
    </footer>
  );
}
