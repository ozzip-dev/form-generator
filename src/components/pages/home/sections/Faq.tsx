"use client";

import { Icon } from "@/components/shared";
import { useState } from "react";
import SectionHeader from "../SectionHeader";
import Link from "next/link";

const faqData = [
  {
    header: "Czy aplikacja jest darmowa?",
    content: (
      <div>
        <p className="mt-8">
          Korzystanie z aplikacji jest bezpłatne dla organizacji związkowych. Po
          <Link href="/admin-contact" className="text-accent" target="blank">
            {" "}
            rejestracji organizacji przez operatora aplikacji{" "}
          </Link>{" "}
          użytkownicy mogą korzystać ze wszystkich dostępnych funkcji bez opłat.
        </p>
      </div>
    ),
  },
  {
    header: "Czy mogę eksportować wyniki do Excela?",
    content: (
      <div>
        <p className="mt-8">
          Dane można wyeksportować do pliku Excel (XLSX) lub PDF. Raport PDF
          może zawierać podsumowanie wszystkich odpowiedzi lub szczegółowe
          zestawienie z każdego formularza.
        </p>
      </div>
    ),
  },

  {
    header: "Jak długo przechowywane są zebrane dane?",
    content: (
      <div>
        <p className="mt-8">
          Zebrane dane są przechowywane do momentu ich usunięcia przez twórcę
          formularza. Zamknięcie formularza nie usuwa zgromadzonych odpowiedzi,
          można je usunąć osobno w dowolnym momencie.
        </p>
      </div>
    ),
  },
];

const Faq = () => {
  const [openItems, setOpenItems] = useState<boolean[]>([]);

  const toggleDetails = (idx: number) => {
    setOpenItems((prev) => {
      const newState = [...prev];
      newState[idx] = !newState[idx];
      return newState;
    });
  };

  return (
    <section className="bg-font_dark text-white">
      <div className="container py-20">
        <SectionHeader header="Często zadawane pytania" />

        <div className="mx-auto mt-12 flex w-2/3 flex-col gap-6 text-font_dark">
          {faqData.map(({ header, content }, idx) => (
            <button
              className="rounded-sm border bg-white p-5 text-left"
              key={header}
              onClick={() => toggleDetails(idx)}
            >
              <div className="flex items-center justify-between gap-6 font-bold">
                {header}{" "}
                <Icon
                  icon="angle"
                  size={30}
                  className={`ml-auto w-10 bg-font_dark ${openItems[idx] ? "rotate-180 transition duration-300" : "rotate-0 transition duration-300"}`}
                />
              </div>

              <div
                className={`grid overflow-hidden transition-all duration-300 ${
                  openItems[idx] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 text-sm">{content}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
