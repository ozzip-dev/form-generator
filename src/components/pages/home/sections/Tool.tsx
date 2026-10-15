import Image from "next/image";
import SectionHeader from "../SectionHeader";

const Tool = () => {
  // Pawel: na razie zostawiam stare ikony w .svg w /public
  const toolData: { icon: string; text: string }[] = [
    {
      icon: "form",
      text: "Formularze w kilka minut. Wybierz szablon albo zacznij od zera",
    },
    {
      icon: "results-view",
      text: "Wyniki na bieżąco. Tabele i wykresy aktualizowane po każdej odpowiedzi",
    },
    {
      icon: "results-export",
      text: "Eksport wyników do .xls i .pdf",
    },
    {
      icon: "gear",
      text: "Kontakty z innymi oragnizacjami. Wymieniaj się dośwaidczeniami z podobnymi organizacjami",
    },
  ];

  return (
    <section className="container">
      <div className="container pb-20 pt-16">
        <SectionHeader header="Szybie decyzje podejmowane wspólnie" />

        <ul className="mt-16 flex list-none flex-wrap justify-center gap-10">
          {toolData.map(({ icon, text }, idx) => (
            <li key={idx} className="w-[140px] sm:w-[180px]">
              <Image
                src={`/images/tools/${icon}.png`}
                alt=""
                width={70}
                height={70}
                className="mx-auto mb-6"
              />
              <p className="text-center text-sm">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Tool;
