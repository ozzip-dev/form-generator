"use client";

import { useState } from "react";
import SectionHeader from "../SectionHeader";
import Link from "next/link";
import FaqItem from "./FaqItem";

const faqData = [
  {
    header: "Czy aplikacja jest darmowa?",
    content: (
      <p>
        Korzystanie z aplikacji jest bezpłatne dla organizacji związkowych. Po
        <Link href="/admin-contact" className="text-accent" target="blank">
          {" "}
          rejestracji organizacji przez operatora aplikacji{" "}
        </Link>{" "}
        użytkownicy mogą korzystać ze wszystkich dostępnych funkcji bez opłat.
      </p>
    ),
  },
  {
    header: "Czy mogę eksportować wyniki do Excela?",
    content: (
      <p>
        Dane można wyeksportować do pliku Excel (XLSX) lub PDF. Raport PDF może
        zawierać podsumowanie wszystkich odpowiedzi lub szczegółowe zestawienie
        z każdego formularza.
      </p>
    ),
  },

  {
    header: "Jak długo przechowywane są zebrane dane?",
    content: (
      <p>
        Zebrane dane są przechowywane do momentu ich usunięcia przez twórcę
        formularza. Zamknięcie formularza nie usuwa zgromadzonych odpowiedzi,
        można je usunąć osobno w dowolnym momencie.
      </p>
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

        <ul className="mx-auto mt-12 flex w-2/3 list-none flex-col gap-6 text-font_dark">
          {faqData.map(({ header, content }, idx) => {
            const isOpen = !!openItems[idx];
            return (
              <FaqItem
                key={header}
                header={header}
                content={content}
                idx={idx}
                isOpen={isOpen}
                onToggle={toggleDetails}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Faq;
