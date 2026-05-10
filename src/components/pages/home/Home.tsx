import Link from "next/link";
import Image from "next/image";
import { Button, ButtonLink } from "@/components/shared";
import { useState } from "react";
import Faq from "./Faq";
import { FormTemplates } from "./sections";

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
        <div className="container pb-20 pt-16">
          <div className="mx-auto w-4/5">
            <h2 className="text-center text-lg">
              Narzędzie stworzone dla organizacji, które chcą działać szybko i
              wspólnie podejmować decyzje
            </h2>
            <p className="mt-4 text-center">
              Aplikacja pozwala na szybkie tworzenie formularzy i ankiet,
              zbieranie opinii, organizowanie głosowań i wyborów online.
            </p>{" "}
          </div>

          <div className="mt-16 gap-10 sm:flex sm:flex-wrap sm:justify-center">
            <div className="sm:w-[180px]">
              <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500">
                {" "}
              </div>
              <p className="text-center text-sm">
                Twórz formularze w kilka minut bez wiedzy technicznej
              </p>
            </div>
            <div className="sm:w-[180px]">
              <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500">
                {" "}
              </div>
              <p className="text-center text-sm">
                Zbieraj odpowiedzi wyniki aktualizują się automatycznie
              </p>
            </div>
            <div className="sm:w-[180px]">
              <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500">
                {" "}
              </div>
              <p className="text-center text-sm">
                Analizuj wyniki i eksportuj raporty Excel, PDF, wykresy
              </p>
            </div>{" "}
            <div className="sm:w-[180px]">
              <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500">
                {" "}
              </div>
              <p className="text-center text-sm">
                Idealna dla organizacji związkowych i stowarzyszeń
              </p>
            </div>
          </div>
        </div>
      </section>

      <FormTemplates />

      <section className="">
        <div className="container pb-20 pt-16">
          <div className="mx-auto w-4/5">
            <h2 className="text-center text-lg">
              Pełna kontrola nad sposobem głosowania
            </h2>
            <p className="mt-4 text-center">
              Każda organizacja może dostosować sposób zbierania odpowiedzi — od
              anonimowych ankiet po jawne głosowania członków. Dane pozostają w
              Twojej organizacji – pełna prywatność
            </p>{" "}
          </div>
          <div className="mt-28 flex flex-col-reverse gap-6 sm:flex-row">
            <div className="flex-1 rounded-sm bg-slate-500 text-white">
              image
            </div>
            <div className="flex-1 p-6">
              <div className="mb-6 font-semibold">Głosowanie anonimowe</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          <div className="mt-28 flex flex-col gap-6 sm:flex-row">
            <div className="flex-1 p-6">
              <div className="mb-6 font-semibold">Głosowanie jawne</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="flex-1 rounded-sm bg-slate-500 text-white">
              image
            </div>
          </div>
          <div className="mt-28 flex flex-col-reverse gap-6 sm:flex-row">
            <div className="flex-1 rounded-sm bg-slate-500 text-white">
              image
            </div>
            <div className="flex-1 p-6">
              <div className="mb-6 font-semibold">
                Głosowanie częściowo anonimowe
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-font_light">
        <div className="container pb-20 pt-16">
          <div className="mx-auto w-4/5">
            <h2 className="text-center text-lg">Jak to działa?</h2>
            <p className="mt-4 text-center">
              Od pomysłu do wyników w 4 krokach
            </p>{" "}
          </div>

          <div className="mt-16 gap-10 sm:flex sm:flex-wrap sm:justify-center">
            <div className="sm:w-[180px]">
              <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500">
                pierwszy
              </div>
              <p className="text-center text-sm">eeeeeeeeee</p>
            </div>
            <div className="sm:w-[180px]">
              <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500">
                drugi
              </div>
              <p className="text-center text-sm">eeeeeeeeee</p>
            </div>
            <div className="sm:w-[180px]">
              <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500">
                trzeci
              </div>
              <p className="text-center text-sm">eeeeeeeeeeeeee</p>
            </div>{" "}
            <div className="sm:w-[180px]">
              <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500">
                czwarty
              </div>
              <p className="text-center text-sm">eeeeeeeeee</p>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="container pb-20 pt-16">
          <div className="mx-auto w-4/5">
            <h2 className="text-center text-lg">
              Zastosowania w organizacjach związkowych
            </h2>
            <p className="mt-4 text-center">
              Zamiast maili i chaosu jeden uporządkowany system
            </p>{" "}
          </div>
          <div className="mt-28 flex flex-col gap-6 md:flex-row">
            <div className="ml-auto flex flex-1 flex-col gap-5 p-6">
              <div className="flex items-center gap-6">
                <div className="h-[40px] w-[70px] rounded-sm bg-slate-500"></div>
                <p>Zbieranie opinii o warunkach pracy</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-[40px] w-[70px] rounded-sm bg-slate-500"></div>
                <p>Konsultacje w sprawie regulaminów</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-[40px] w-[70px] rounded-sm bg-slate-500"></div>
                <p>Szybkie ankiety w zakładach pracy</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-5 p-6">
              <div className="flex items-center gap-6">
                <div className="h-[40px] w-[70px] rounded-sm bg-slate-500"></div>
                <p>Głosowanie na temat akcji protestacyjnej</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-[40px] w-[70px] rounded-sm bg-slate-500"></div>
                <p>Organizacja spotkań i wydarzeń</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-[40px] w-[70px] rounded-sm bg-slate-500"></div>
                <p>Organizacja spotkań i wydarzeń</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-font_light">
        <div className="container py-20">
          <h2 className="mb-20 text-center text-lg">Często zadawane pytania</h2>
          <Faq />
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
