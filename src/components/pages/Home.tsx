import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <div className="m-4 block items-center justify-items-center text-end">
        <Link href="/login" className="btn-primary-rounded text-xl">
          Zaloguj się
        </Link>
      </div>

      <div className="mx-auto my-40 w-[80%] max-w-[600px] overflow-hidden rounded-sm border border-accent sm:rounded-md md:rounded-lg">
        <div className="bg-accent px-10 py-6 text-center text-lg">
          Usprawnij Działanie Związku Zawodowego
        </div>

        <div className="p-md pl-lg">
          <ul className="list-disc [&_li]:pb-4">
            <li>
              Wygeneruj formularz od zera lub korzystając z gotowych szablonów.
              Wyślij go do pracowników i pracowniczek, pobierz raporty wyników
            </li>
            <li>
              Uzyskaj dostęp do innych komisji tworzących interesujące Cię
              formularze, znajdź niezbędną pomoc
            </li>
            <li>
              Stwórz bazę protokołów ze sporów zbiorowych, dodając niezbędne
              kategorie załączników
            </li>
            <li>
              Dyskutuj z innymi komisjami na forum, dzielcie się doświadczeniami
            </li>
          </ul>
        </div>
      </div>

      <footer className="items-center justify-center p-2 sm:flex">
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
    </>
  );
};
export default Home;
