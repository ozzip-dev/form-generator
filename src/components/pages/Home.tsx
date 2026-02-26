import Link from "next/link";
import Image from "next/image";

const texts: { header: string; text: string }[] = [
  {
    header: "Twórz formularze dokładnie tak, jak potrzebujesz",
    text: "Wygeneruj formularz od zera albo skorzystaj z gotowych szablonów. Określ stopień jawności. Wyślij go do pracowników i pracowniczek, a następnie wygodnie pobierz raporty z wynikami.",
  },
  {
    header: "Współpracuj z innymi komisjami",
    text: "Uzyskaj dostęp do komisji, które tworzą formularze z interesujących Cię kategorii. Znajdź potrzebne wsparcie i korzystaj z ich doświadczenia.",
  },
  {
    header: "Buduj bazę protokołów ze sporów zbiorowych",
    text: "Twórz i porządkuj dokumentację, dodając protokoły oraz załączając pliki do odpowiednich kategorii.",
  },
  {
    header: "Wymieniaj się doświadczeniami na forum",
    text: "Dyskutuj z innymi komisjami, zadawaj pytania i dziel się wiedzą.",
  },
];

const Home = () => {
  return (
    <>
      <div className="mx-auto my-16 w-[80%] max-w-[600px] overflow-hidden rounded-sm border border-accent sm:rounded-md md:my-40 md:rounded-lg">
        <div className="bg-accent px-10 py-6 text-center text-lg text-white">
          Usprawnij Działanie Związku Zawodowego
        </div>

        <div className="p-sm pl-md md:p-md md:pl-lg">
          <div className="pb-sm">
            <b>Witaj w aplikacji!</b>
            <br />
            Cieszymy się, że jesteś z nami. Zobacz, co możesz tutaj zrobić:
          </div>
          <ul className="list-disc [&_li]:pb-4">
            {texts.map(({ header, text }, idx) => (
              <li key={idx}>
                <div className="font-black">{header}</div>
                <div>{text}</div>
              </li>
            ))}
          </ul>
          <div className="mt-sm flex justify-center">
            <Link href="/login" className="btn-primary rounded-sm">
              Zaloguj się
            </Link>
          </div>
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
