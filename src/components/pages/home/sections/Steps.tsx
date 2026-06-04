import Image from "next/image";
import SectionHeader from "../SectionHeader";
import StepDots from "../StepDots";

const steps = [
  {
    id: 1,
    image: "/images/step1.png",
    text: "Zarejestruj organizację",
    layoutClass: "lg:col-start-1 lg:row-start-1 lg:justify-self-end",
  },
  {
    id: 2,
    image: "/images/step2.png",
    text: "Stwórz nowy formularz",
    layoutClass: "lg:col-start-3 lg:row-start-2 lg:justify-self-start",
  },
  {
    id: 3,
    image: "/images/step3.png",
    text: "Udostępnij link uczestnikom",
    layoutClass: "lg:col-start-1 lg:row-start-3 lg:justify-self-end",
  },
  {
    id: 4,
    image: "/images/step4.png",
    text: "Zobacz pełny przewodnik",
    layoutClass: "lg:col-start-3 lg:row-start-4 lg:justify-self-start",
  },
];

const Steps = () => {
  return (
    <section className="bg-font_dark text-white">
      <div className="container pb-20 pt-16">
        <SectionHeader
          header="Jak to działa?"
          subheader="Od pomysłu do wyników w 4 krokach"
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] lg:grid-rows-4 lg:gap-x-10 lg:gap-y-0">
          {steps.map(({ id, image, text, layoutClass }) => (
            <div
              key={id}
              className={`relative w-full max-w-[560px] ${layoutClass} justify-self-center`}
            >
              <Image
                src={image}
                alt={text}
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
            </div>
          ))}

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
