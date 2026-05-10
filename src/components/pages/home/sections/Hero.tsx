import { ButtonLink } from "@/components/shared";

const Hero = () => {
  return (
    <>
      <section className="bg-[#CAD3F2]">
        {" "}
        <div className="container py-10 md:hidden">
          <h1 className="text-xl font-semibold">
            Twórz ankiety, głosowania i formularze dla swojej organizacji w
            kilka minut
          </h1>

          <p className="mt-4">
            Prosta aplikacja dla związków zawodowych i organizacji pracowniczych
            do zbierania opinii, organizowania głosowań i podejmowania decyzji
            online.
          </p>
          <ButtonLink
            message="Zarejestruj organizację"
            link="/admin-contact"
            variant="primary-rounded"
            className="my-12 w-fit !border-error !bg-error !text-white hover:!border-white hover:!bg-white hover:!text-error"
          />
        </div>
      </section>
      <section className="bg-[url('/images/hero.webp')] bg-cover bg-center px-6 py-20 sm:block sm:h-[200px] md:h-auto">
        <div className="container lg:flex lg:items-center">
          <div className="hidden md:block md:w-[57%]">
            <h1 className="text-xl font-semibold">
              Twórz ankiety, głosowania i formularze dla swojej organizacji w
              kilka minut
            </h1>

            <p className="mt-4">
              Prosta aplikacja dla związków zawodowych i organizacji
              pracowniczych do zbierania opinii, organizowania głosowań i
              podejmowania decyzji online.
            </p>
            <ButtonLink
              message="Zarejestruj organizację"
              link="/admin-contact"
              variant="primary-rounded"
              className="my-12 w-fit !border-error !bg-error !text-white hover:!border-white hover:!bg-white hover:!text-error"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
