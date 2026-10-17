import Image from "next/image";
import SectionHeader from "../SectionHeader";
import { Icon } from "@/components/shared";
import CardSmall from "@/components/shared/cards/CardSmall";

const Tool = () => {
  // Pawel: na razie zostawiam stare ikony w .svg w /public
  const toolData: { icon: string; header: string; subheader: string }[] = [
    {
      icon: "clipboard",
      header: "Formularze w kilka minut",
      subheader: " Wybierz szablon albo zacznij od zera",
    },
    {
      icon: "list-check",
      header: "Wyniki na bieżąco",
      subheader: "Tabele i wykresy aktualizowane po każdej odpowiedzi",
    },
    {
      icon: "file-arrow",
      header: "Eksport do .xls i .pdf",
      subheader: "Tabele i wykresy aktualizowane po każdej odpowiedzi",
    },
    {
      icon: "people-group",
      header: "Kontakty z innymi oragnizacjami",
      subheader: "Wymieniaj się dośwaidczeniami z podobnymi organizacjami",
    },
  ];

  return (
    <section className="bg-bg_dark">
      <div className="container py-20">
        <SectionHeader
          title="DLA ORGANIZACAJI PRACOWNICZYCH"
          header="Szybie decyzje podejmowane wspólnie"
          subheader="Wszystko, czego potrzebujesz, żeby od pytania dojść do wyniku."
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {toolData.map(({ icon, header, subheader }, idx) => (
            <li key={idx}>
              <CardSmall>
                <div className="bg-gradient-accent w-fit rounded-sm p-4">
                  {<Icon icon={`${icon}`} size={30} className="bg-white" />}
                </div>

                <h3 className="my-6 text-lg font-bold">{header}</h3>
                <p className="text-font_light">{subheader}</p>
              </CardSmall>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Tool;
