import CardSmall from "@/components/shared/cards/CardSmall";
import SectionHeader from "../SectionHeader";
import StepDots from "../StepDots";
import { az } from "zod/v4/locales";

const steps = [
  {
    id: 1,
    image: "/images/step1.png",
    text: "Zarejestruj organizację",
    description: "Skontaktuj się z obsługą aplikacji.",
    layoutClass:
      "lg:col-start-1 lg:row-start-1 lg:justify-self-end lg:flex lg:justify-end",
    alt: "Zarejestruj organizację",
  },
  {
    id: 2,
    image: "/images/step2.png",
    text: "Utwórz własny formularz",
    description: "Udostępnij link do oddania głosu.",
    layoutClass:
      "lg:col-start-3 lg:row-start-2 lg:justify-self-start  lg:flex lg:justify-start",
    alt: "Utwórz własny formularz",
  },
  {
    id: 3,
    image: "/images/step3.png",
    text: "Śledź wyniki na bieżąco",
    description: "Odpowiedzi widzisz na bieżąco.",
    layoutClass:
      "lg:col-start-1 lg:row-start-3 lg:justify-self-end  lg:flex lg:justify-end",
    alt: "Śledź wyniki na bieżąco.",
  },
  {
    id: 4,
    image: "/images/step4.png",
    text: "Wymień doświadczenia",
    description: "Porozmawiaj z innymi organizacjami.",
    layoutClass:
      "lg:col-start-3 lg:row-start-4 lg:justify-self-start  lg:flex lg:justify-start",
    alt: "Wymień się doświadczeniami z innymi organizacjami.",
  },
];

type Props = {
  id: number;
  className?: string;
};

const NumberContainer = ({ id, className }: Props) => {
  return (
    <div
      className={`bg-gradient-accent flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full border-[0.6rem] border-white text-[30px] leading-none text-white [box-shadow:0px_10px_14px_-4px_var(--color-accent)] ${className && className}`}
    >
      {id}
    </div>
  );
};

const Steps = () => {
  return (
    <section>
      {" "}
      <div className="container pb-20 pt-16">
        <SectionHeader title="Jak to działa" header="Od pomysłu do wyników" />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] lg:grid-rows-4 lg:gap-x-2 lg:gap-y-0">
          <ol className="contents">
            {steps.map(({ id, text, description, layoutClass }) => (
              <li
                key={id}
                className={`relative w-full ${layoutClass} justify-self-center py-2`}
              >
                <NumberContainer id={id} className={"m-auto mb-8 lg:hidden"} />
                <CardSmall className="!h-auto lg:!h-fit lg:w-4/5">
                  {" "}
                  <div className="flex justify-center">
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
                <NumberContainer id={id} />
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
