import Image from "next/image";
import SectionHeader from "../SectionHeader";

const Usage = () => {
  const usageCases: string[] = [
    "Zbieranie opinii o warunkach pracy",
    "Konsultacje w sprawie regulaminów",
    "Głosowanie na temat planowanych działań",
    "Organizacja spotkań i wydarzeń",
    "Szybkie ankiety w zakładach pracy",
    "Organizowanie wyborów",
  ];
  return (
    <section className="">
      <div className="container pb-20 pt-16">
        <SectionHeader
          header="Zastosowania w organizacjach związkowych"
          subheader="Zamiast maili i chaosu jeden uporządkowany system"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {usageCases.map((text, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <div className="h-[40px] w-[70px]">
                <Image
                  src="/images/usage_icon.png"
                  alt="usage"
                  width={190}
                  height={124}
                />
              </div>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Usage;
