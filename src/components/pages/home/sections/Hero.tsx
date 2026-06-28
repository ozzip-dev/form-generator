import { ButtonLink } from "@/components/shared";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/baner-hero.jpg"
        alt="baner"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="relative z-10 flex min-h-[500px] items-center">
        <div className="container px-6 text-white">
          <div className="md:w-[56%] lg:w-1/2">
            <h1 className="text-xl font-semibold">
              Ankiety, głosowania i formularze dla organizacji związkowych
            </h1>

            <p className="mt-10">
              Aplikacja do zbierania opinii i organizowania głosowań online.
            </p>

            <ButtonLink
              message="Zarejestruj organizację"
              link="/admin-contact"
              variant="primary-rounded"
              className="mt-12 w-fit !border-error !bg-error !text-white hover:!border-white hover:!bg-white hover:!text-error"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
