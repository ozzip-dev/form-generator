import Image from "next/image";
import SectionHeader from "../SectionHeader";

const Tool = () => {
  // Pawel: na razie zostawiam stare ikony w .svg w /public
  const toolData: { icon: string; text: string }[] = [
    {
      icon: "form",
      text: "Twórz formularze w kilka minut",
    },
    {
      icon: "results-view",
      text: "Wyniki w formie tabel i wykresów",
    },
    {
      icon: "results-export",
      text: "Eksportuj wyniki w formatach .xls i .pdf",
    },
    {
      icon: "gear",
      text: "Dla organizacji związkowych",
    },
  ];

  return (
    <section className="container">
      <div className="container pb-20 pt-16">
        <SectionHeader
          header="Narzędzie stworzone dla organizacji, które chcą działać szybko i
            wspólnie podejmować decyzje"
          subheader="Aplikacja pozwala na szybkie tworzenie formularzy i ankiet,
            zbieranie opinii, organizowanie głosowań i wyborów online."
        />

        <div className="mt-16 flex flex-wrap justify-center gap-10">
          {toolData.map(({ icon, text }, idx) => (
            <div key={idx} className="w-[160px] sm:w-[180px]">
              <Image
                src={`/images/tools/${icon}.png`}
                alt=""
                width={70}
                height={70}
                className="mx-auto mb-6"
              />
              <p className="text-center text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tool;
