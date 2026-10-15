import Image from "next/image";
import SectionHeader from "../SectionHeader";

const Usage = () => {
  const usageCases: string[] = [
    "Opinie o warunkach pracy",
    "Konsultacje regulaminów",
    "Głosowanie nad planowanymi działaniami",
    "Spotkania i wydarzenia",
    "Szybkie ankiety w zakładach pracy",
    "Wybory",
  ];
  return (
    <section className="">
      <div className="container pb-20 pt-16">
        <SectionHeader header="Zamiast maili i chaosu jeden uporządkowany system" />

        <ul className="mt-16 grid list-none gap-8 md:grid-cols-2">
          {usageCases.map((text, idx) => (
            <li key={idx} className="flex items-center gap-6">
              <div className="h-[40px] w-[70px]">
                <Image
                  src="/images/usage_icon.png"
                  alt="usage"
                  width={190}
                  height={124}
                />
              </div>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Usage;
