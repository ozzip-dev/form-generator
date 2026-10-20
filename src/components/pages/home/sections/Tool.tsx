import Image from "next/image";
import SectionHeader from "../SectionHeader";
import { Icon } from "@/components/shared";
import CardSmall from "@/components/shared/cards/CardSmall";
import IconCart from "@/components/shared/icons/IconCart";

const Tool = () => {
  // Pawel: na razie zostawiam stare ikony w .svg w /public
  const toolData: { icon: string; header: string; subheader: string }[] = [
    {
      icon: "lightning",
      header: "Formularze w kilka minut",
      subheader: " Wybierz szablon albo zacznij od zera",
    },
    {
      icon: "pulse",
      header: "Wyniki na bieżąco",
      subheader: "Tabele i wykresy aktualizowane po każdej odpowiedzi",
    },
    {
      icon: "file-arrow",
      header: "Eksport do .xls i .pdf",
      subheader: "Tabele i wykresy aktualizowane po każdej odpowiedzi",
    },
    {
      icon: "comment",
      header: "Kontakty z innymi organizacjami",
      subheader: "Wymieniaj się doświadczeniami z podobnymi organizacjami",
    },
  ];

  return (
    <section>
      <div className="container py-20">
        <SectionHeader
          title="Dla organizacji pracowniczych"
          header="Szybkie decyzje podejmowane wspólnie"
          subheader="Wszystko, czego potrzebujesz, żeby od pytania dojść do wyniku."
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {toolData.map(({ icon, header, subheader }, idx) => (
            <li key={idx}>
              <CardSmall>
                <IconCart>
                  {<Icon icon={`${icon}`} size={30} className="bg-white" />}
                </IconCart>

                <h3 className="my-6 text-lg font-bold">{header}</h3>
                <p className="text-font-light">{subheader}</p>
              </CardSmall>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Tool;
