import Image from "next/image";
import SectionHeader from "../SectionHeader";

const voteVisibilityItems = [
  {
    image: "/images/voting.jpg",
    header: "Głosowanie anonimowe",
    text: "Zbiorcze podsumowanie odpowiedzi bez powiązania z pojedynczymi formularzami.",
  },
  {
    image: "/images/hands.jpg",
    header: "Głosowanie jawne",
    text: "Pełny dostęp do odpowiedzi z możliwością identyfikacji każdego głosującego.",
  },
  {
    image: "/images/card.jpg",
    header: "Głosowanie częściowo anonimowe",
    text: "Możliwość ukrycia wybranych odpowiedzi, np. danych osobowych, przy zachowaniu pozostałych.",
  },
];

const VoteVisibility = () => {
  return (
    <section className="bg-font_dark text-white">
      <div className="container pb-20 pt-16">
        <SectionHeader
          header="Pełna kontrola nad zapisem danych"
          subheader="Organizacja związkowa określa sposób zbierania odpowiedzi. Anonimowe lub janwne głosowania. Dane pozostają w Twojej organizacji"
        />

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {voteVisibilityItems.map(({ image, header, text }) => (
            <div
              key={header}
              className="flex flex-col items-center text-center"
            >
              <Image
                src={image}
                alt={header}
                width={1200}
                height={800}
                className="h-auto w-full rounded-lg"
              />
              <div className="mt-6 text-lg font-semibold">{header}</div>
              <p className="mt-4 max-w-prose">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoteVisibility;
