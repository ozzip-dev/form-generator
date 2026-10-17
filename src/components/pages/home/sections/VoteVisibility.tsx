import SectionHeader from "../SectionHeader";
import CardSmall from "@/components/shared/cards/CardSmall";

const voteVisibilityItems = [
  {
    header: "Anonimowe",
    text: "Zbiorcze podsumowanie odpowiedzi bez powiązania z konkretnym głosującym.",
    activeBars: 0,
  },
  {
    header: "Jawne",
    text: "Pełny dostęp do odpowiedzi i wiesz, kto jak głosował.",
    activeBars: 4,
  },
  {
    header: "Częściowo anonimowe",
    text: "Wybrane odpowiedzi ukryte, np. dane osobowe, przy zachowaniu pozostałych.",
    activeBars: 2,
  },
];

const VoteVisibility = () => {
  return (
    <section className="bg-bg_dark">
      <div className="container py-20">
        <SectionHeader
          title="PEŁNA KONTROLA NAD ZAPISEM DANYCH"
          header="Ty decydujesz, jak zapisują się odpowiedzi"
          subheader="Wybierasz tryb głosowania. Dane pozostają w Twojej organizacji."
        />

        <ul className="mt-16 flex flex-col gap-8 md:flex-row">
          {voteVisibilityItems.map(({ header, text, activeBars }) => {
            const activeBar = activeBars;

            return (
              <li key={header} className="flex-1">
                <CardSmall className="flex h-full flex-col justify-between">
                  <div>
                    <h3 className="mb-6 text-lg font-bold">{header}</h3>

                    <p className="pb-6 text-font_light">{text}</p>
                  </div>

                  <div className="mt-auto flex gap-2">
                    {Array.from({ length: 4 }, (_, idx) => (
                      <div
                        key={idx}
                        className={`h-4 flex-1 rounded-sm ${
                          idx % 2 === 0 && activeBars === 2
                            ? "bg-accent"
                            : activeBars === 4
                              ? "bg-accent"
                              : "bg-gray"
                        }`}
                      />
                    ))}
                  </div>
                </CardSmall>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default VoteVisibility;
