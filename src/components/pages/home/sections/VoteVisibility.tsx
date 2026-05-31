import Image from "next/image";
import SectionHeader from "../SectionHeader";

const VoteVisibility = () => {
  return (
    <section className="">
      <div className="container pb-20 pt-16">
        <SectionHeader
          header="Pełna kontrola nad zapisem danych"
          subheader="Każda organizacja może dostosować sposób zbierania odpowiedzi - od anonimowych ankiet po jawne głosowania członków. Dane pozostają w Twojej organizacji - pełna prywatność"
        />

        <div className="mt-28 flex flex-col-reverse gap-6 sm:flex-row">
          <div className="flex-1 rounded-sm">
            <Image
              src="/images/voting.jpg"
              alt=""
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="mb-6 font-semibold">Głosowanie anonimowe</div>
            <p>
              Zbiorcze podsumowanie odpowiedzi bez powiązania ich z pojedynczymi
              formularzami.
            </p>
          </div>
        </div>
        <div className="mt-28 flex flex-col gap-6 sm:flex-row">
          <div className="flex-1 p-6">
            <div className="mb-6 font-semibold">Głosowanie jawne</div>
            <p>Odpowiedzi z każdego formularza.</p>
          </div>
          <div className="flex-1 rounded-sm">
            <Image
              src="/images/hands.jpg"
              alt=""
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
        </div>
        <div className="mt-28 flex flex-col-reverse gap-6 sm:flex-row">
          <div className="flex-1 rounded-sm">
            <Image
              src="/images/card.jpg"
              alt=""
              width={1200}
              height={800}
              className="h-auto w-full"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="mb-6 font-semibold">
              Głosowanie częściowo anonimowe
            </div>
            <p>
              Możliwość ukrycia w wynikach pojedynczych odpowiedzi np. danych
              osobowych.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoteVisibility;
