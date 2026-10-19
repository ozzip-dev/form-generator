import Image from "next/image";
import SectionHeader from "../SectionHeader";
import StepDots from "../StepDots";
import Link from "next/link";
import CardSmall from "@/components/shared/cards/CardSmall";

const steps = [
  {
    id: 1,
    image: "/images/step1.png",
    text: "Zarejestruj organizację",
    description: "Skontaktuj się z obsługą aplikacji.",
    layoutClass: "lg:col-start-1 lg:row-start-1 lg:justify-self-end",
    alt: "Zarejestruj organizację",
  },
  {
    id: 2,
    image: "/images/step2.png",
    text: "Utwórz własny formularz",
    description: "Udostępnij link do oddania głosu.",
    layoutClass: "lg:col-start-3 lg:row-start-2 lg:justify-self-start",
    alt: "Utwórz własny formularz",
  },
  {
    id: 3,
    image: "/images/step3.png",
    text: "Śledź wyniki na bieżąco",
    description: "Odpowiedzi widzisz na bieżąco.",
    layoutClass: "lg:col-start-1 lg:row-start-3 lg:justify-self-end",
    alt: "Śledź wyniki na bieżąco.",
  },
  {
    id: 4,
    image: "/images/step4.png",
    text: "Wymień doświadczenia",
    description: "Porozmawiaj z innymi organizacjami.",
    layoutClass: "lg:col-start-3 lg:row-start-4 lg:justify-self-start",
    alt: "Wymień się doświadczeniami z innymi organizacjami.",
  },
];

const Steps = () => {
  return (
    <section className="bg-bg-dark">
      {" "}
      <div className="container pb-20 pt-16">
        <SectionHeader title="Jak to działa" header="Od pomysłu do wyników" />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] lg:grid-rows-4 lg:gap-x-10 lg:gap-y-0">
          <ol className="contents">
            {steps.map(({ id, image, text, description, alt, layoutClass }) => (
              <li
                key={id}
                className={`relative w-full ${layoutClass} justify-self-center`}
              >
                <div className="bg-gradient-accent m-auto mb-8 flex h-[56px] w-[56px] items-center justify-center rounded-full text-[30px] leading-none text-white lg:hidden">
                  {id}
                </div>
                <CardSmall className="!h-auto">
                  {" "}
                  <div className="text-font-dark flex items-start">
                    <div className="">
                      <p className="mb-2 text-lg font-bold leading-snug">
                        {text}
                      </p>
                      <p className="text-font-light leading-snug">
                        {description}
                      </p>
                    </div>
                  </div>{" "}
                </CardSmall>
                {/* <Image
                  src={image}
                  alt={alt}
                  width={560}
                  height={240}
                  className="h-auto w-full rounded-[24px]"
                  priority={id === 1}
                /> */}
              </li>
            ))}
          </ol>

          {steps.map(({ id }) => (
            <div
              key={`timeline-${id}`}
              className="hidden lg:col-start-2 lg:flex lg:items-center lg:justify-center"
              style={{ gridRowStart: id }}
            >
              <div className="flex h-full w-full flex-col items-center">
                <StepDots isDisplayed={id > 1} />

                <div className="bg-gradient-accent flex h-[56px] w-[56px] items-center justify-center rounded-full text-[30px] leading-none text-white">
                  {id}
                </div>

                <StepDots isDisplayed={id < steps.length} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
