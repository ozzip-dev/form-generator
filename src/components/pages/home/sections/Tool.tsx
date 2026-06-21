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
      text: "Aktualne wyniki w formie tabel i wykresów",
    },
    {
      icon: "results-export",
      text: "Eksportuj wyniki w formatach .xls i .pdf",
    },
    {
      icon: "gear",
      text: "Nawiąż kontakty z innymi organizacjami",
    },
  ];

  return (
    <section className="container">
      <div className="container pb-20 pt-16">
        <SectionHeader
          header="Aplikacja dla organizacji pracowniczych, które chcą szybko i
            wspólnie podejmować decyzje"
        />

        <ul className="mt-16 flex list-none flex-wrap justify-center gap-10">
          {toolData.map(({ icon, text }, idx) => (
            <li key={idx} className="w-[160px] sm:w-[180px]">
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
