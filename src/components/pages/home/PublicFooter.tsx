import { ButtonLink } from "@/components/shared";
import Image from "next/image";
import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-gray pb-10 pt-6">
      <div className="container text-font-light">
        <div className="items-center justify-center p-2 md:flex">
          <Image
            src="/images/UELogos.webp"
            alt="Loga"
            width={400}
            height={100}
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
            loading="lazy"
            className="m-auto w-[27rem] md:m-0"
          />
          <Image
            src="/images/TransferHubLogo.webp"
            alt="TransferHub logo"
            width={100}
            height={25}
            className="m-auto w-[6rem] pl-2 md:m-0 md:border-l-2 md:border-gray"
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
            className="inline text-xs"
          >
            {" "}
            www.transferhub.pl
          </ButtonLink>
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
            className="inline text-xs"
          >
            {" "}
            CC BY 4.0
          </ButtonLink>
          <p>Kontakt: wstapdoip@ozzip.pl</p>
        </div>{" "}
      </div>
    </footer>
  );
}
