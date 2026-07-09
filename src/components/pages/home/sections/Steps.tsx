import Image from "next/image";
import SectionHeader from "../SectionHeader";
import StepDots from "../StepDots";
import Link from "next/link";

const steps = [
  {
    id: 1,
    image: "/images/step1.png",
    text: (
      <Link href="/admin-contact" className="text-accent" target="blank">
        Zarejestruj organizację
      </Link>
    ),
    layoutClass: "lg:col-start-1 lg:row-start-1 lg:justify-self-end",
    alt: "Zarejestruj organizację",
  },
  {
    id: 2,
    image: "/images/step2.png",
    text: (
      <Link href="/forms/list" className="text-accent" target="blank">
        Utwórz własny formularz
      </Link>
    ),
    layoutClass: "lg:col-start-3 lg:row-start-2 lg:justify-self-start",
    alt: "Utwórz własny formularz",
  },
  {
    id: 3,
    image: "/images/step3.png",
    text: "Udostępnij link zainteresowanym",
    layoutClass: "lg:col-start-1 lg:row-start-3 lg:justify-self-end",
    alt: "Udostępnij link zainteresowanym",
  },
  {
    id: 4,
    image: "/images/step4.png",
    text: "Śledź wyniki na bieżąco",
    layoutClass: "lg:col-start-3 lg:row-start-4 lg:justify-self-start",
    alt: "Śledź wyniki na bieżąco",
  },
  {
    id: 5,
    image: "/images/step4.png",
    text: "Wymień się doświadczeniami z innymi organizacjami",
    layoutClass: "lg:col-start-1 lg:row-start-5 lg:justify-self-end",
    alt: "Wymień się doświadczeniami z innymi organizacjami",
  },
];

const Steps = () => {
  return (
    <section className="text-font_dark">
      <div className="container pb-20 pt-16">
        <SectionHeader
          header="Jak to działa?"
          subheader="Od pomysłu do wyników w 5 krokach"
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] lg:grid-rows-5 lg:gap-x-10 lg:gap-y-0">
          <ol className="contents">
            {steps.map(({ id, image, text, alt, layoutClass }) => (
              <li
                key={id}
                className={`relative w-full max-w-[560px] list-none ${layoutClass} justify-self-center`}
              >
                <Image
                  src={image}
                  alt={alt}
                  width={560}
                  height={240}
                  className="h-auto w-full rounded-[24px]"
                  priority={id === 1}
                />
                <div className="absolute inset-0 flex items-start p-6 text-font_dark sm:p-8">
                  <div className="max-w-[45%]">
                    <div className="text-xl font-semibold leading-tight sm:text-xl">
                      Krok: {id}
                    </div>
                    <p className="mt-1 text-sm leading-snug sm:text-base">
                      {text}
                    </p>
                  </div>
                </div>
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

                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#D10000] text-[30px] leading-none text-white">
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
