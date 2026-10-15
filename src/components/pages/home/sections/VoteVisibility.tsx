import Image from "next/image";
import SectionHeader from "../SectionHeader";

const voteVisibilityItems = [
  {
    image: "/images/voting.jpg",
    header: "Anonimowe",
    text: "Zbiorcze podsumowanie odpowiedzi bez powiązania z konkretnym głosującym.",
  },
  {
    image: "/images/hands.jpg",
    header: "Jawne",
    text: "Pełny dostęp do odpowiedzi i wiesz kto jak głosował.",
  },
  {
    image: "/images/card.jpg",
    header: "Częściowo anonimowe",
    text: "Wybrane odpowiedzi ukryte, np. dane osobowe, przy zachowaniu pozostałych.",
  },
];

const VoteVisibility = () => {
  return (
    <section className="bg-font_dark text-white">
      <div className="container pb-20 pt-16">
        <SectionHeader
          header="Decydujesz jak zapisują się wypowiedzi"
          subheader="Wyberasz tryb glosowania. Dane pozostają w Twojej organizacji."
        />

        <ul className="mt-12 grid list-none grid-cols-1 gap-10 md:grid-cols-3">
          {voteVisibilityItems.map(({ image, header, text }) => (
            <li key={header} className="flex flex-col items-center text-center">
              <Image
                src={image}
                alt={header}
                width={1200}
                height={800}
                className="h-auto w-full rounded-lg"
              />
              <h3 className="mt-6 text-lg font-semibold">{header}</h3>
              <p className="mt-4 max-w-prose">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default VoteVisibility;
