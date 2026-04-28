import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/shared";

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
      <section className="bg-[#CAD3F2]">
        {" "}
        <div className="container py-10 md:hidden">
          <h1 className="text-xl font-semibold">
            Twórz ankiety, głosowania i formularze dla swojej organizacji w
            kilka minut
          </h1>

          <p className="mt-4">
            Prosta aplikacja dla związków zawodowych i organizacji pracowniczych
            do zbierania opinii, organizowania głosowań i podejmowania decyzji
            online.
          </p>
          <ButtonLink
            message="Zarejestruj organizację"
            link="/admin-contact"
            variant="primary-rounded"
            className="my-12 w-fit !border-error !bg-error !text-white hover:!border-white hover:!bg-white hover:!text-error"
          />
        </div>
      </section>
      <section className="bg-[url('/images/hero.webp')] bg-cover bg-center px-6 py-20 sm:block sm:h-[200px] md:h-auto">
        <div className="container lg:flex lg:items-center">
          <div className="hidden md:block md:w-[57%]">
            <h1 className="text-xl font-semibold">
              Twórz ankiety, głosowania i formularze dla swojej organizacji w
              kilka minut
            </h1>

            <p className="mt-4">
              Prosta aplikacja dla związków zawodowych i organizacji
              pracowniczych do zbierania opinii, organizowania głosowań i
              podejmowania decyzji online.
            </p>
            <ButtonLink
              message="Zarejestruj organizację"
              link="/admin-contact"
              variant="primary-rounded"
              className="my-12 w-fit !border-error !bg-error !text-white hover:!border-white hover:!bg-white hover:!text-error"
            />
          </div>
        </div>
      </section>

      <section className="container">
        <div className="container w-2/3 pb-20 pt-10">
          <h2 className="text-center text-lg">
            Narzędzie stworzone dla organizacji, które chcą działać szybko i
            wspólnie podejmować decyzje
          </h2>
          <p className="mt-4 text-center">
            Aplikacja pozwala na szybkie tworzenie formularzy i ankiet,
            zbieranie opinii, organizowanie głosowań i wyborów online.
          </p>
        </div>

        <div className="sm:flex sm:flex-wrap sm:justify-center">
          <div className="sm:w-1/4">
            <div> aaaaaaaaaaaaaaaa</div>
            <p className="text-center text-sm">
              Twórz formularze w kilka minut bez wiedzy technicznej
            </p>
          </div>
          <div className="sm:w-1/4">
            <div> aaaaaaaaaaaaaaaa</div>
            <p className="text-center text-sm">
              Twórz formularze w kilka minut bez wiedzy technicznej
            </p>
          </div>
          <div className="sm:w-1/4">
            <div> aaaaaaaaaaaaaaaa</div>
            <p className="text-center text-sm">
              Twórz formularze w kilka minut bez wiedzy technicznej
            </p>
          </div>
        </div>
      </section>
    </>

    // <div className="h-full overflow-auto">
    //   <div className="mx-auto my-16 w-[80%] max-w-[600px] overflow-hidden rounded-sm border border-accent sm:rounded-md md:my-40 md:rounded-lg">
    //     <div className="bg-accent px-10 py-6 text-center text-lg text-white">
    //       Usprawnij Działanie Związku Zawodowego
    //     </div>

    //     <div className="p-sm pl-md md:p-md md:pl-lg">
    //       <div className="pb-sm">
    //         <b>Witaj w aplikacji!</b>
    //         <br />
    //         Cieszymy się, że jesteś z nami. Zobacz, co możesz tutaj zrobić:
    //       </div>
    //       <ul className="list-disc [&_li]:pb-4">
    //         {texts.map(({ header, text }, idx) => (
    //           <li key={idx}>
    //             <div className="font-black">{header}</div>
    //             <div>{text}</div>
    //           </li>
    //         ))}
    //       </ul>
    //       <div className="mt-sm flex justify-center">
    //         <Link href="/login" className="btn-primary rounded-sm">
    //           Zaloguj się
    //         </Link>
    //       </div>
    //     </div>
    //   </div>

    // </div>
  );
};
export default Home;
