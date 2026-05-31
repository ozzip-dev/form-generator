"use client";

import { Button, Icon } from "@/components/shared";
import { useState } from "react";
import SectionHeader from "../SectionHeader";

const faqData = [
  {
    header: "Czy formularze mogą być anonimowe?",
    content: (
      <div>
        <p>eeeeee</p>
      </div>
    ),
  },
  {
    header: "Jak długo przechowywane są dane?",
    content: (
      <div>
        <p>eeeeee</p>
      </div>
    ),
  },
  {
    header: "Czy mogę eksportować wyniki do Excela?",
    content: (
      <div>
        <p>eeeeee</p>
      </div>
    ),
  },
  {
    header: "Czy aplikacja jest darmowa?",
    content: (
      <div>
        <p>eeeeee</p>
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
    <section className="bg-font_light">
      <div className="container py-20">
        <SectionHeader header="Często zadawane pytania" />

        <div className="mx-auto flex w-2/3 flex-col gap-6">
          {faqData.map(({ header, content }, idx) => (
            <button
              className="rounded-sm border bg-white p-10 text-left"
              key={header}
              onClick={() => toggleDetails(idx)}
            >
              <div className="flex items-center">
                {header}{" "}
                <Icon
                  icon="angle"
                  size={30}
                  className={`ml-auto bg-font_dark ${openItems[idx] ? "rotate-180 transition duration-300" : "rotate-0 transition duration-300"}`}
                />
              </div>

              <div
                className={`grid overflow-hidden transition-all duration-300 ${
                  openItems[idx] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0">{content}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
