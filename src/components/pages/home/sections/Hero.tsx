import { ButtonLink } from "@/components/shared";

const Hero = () => {
  return (
    <section className="overflow-hidde l relative bg-white py-16 lg:py-40">
      <div className="absolute inset-0 animate-gradient bg-white bg-[radial-gradient(circle_at_top_left,#06b6d4_0%,transparent_30%),radial-gradient(circle_at_bottom_right,#8b5cf6_0%,transparent_35%),radial-gradient(circle_at_center,#2563eb_0%,transparent_40%),linear-gradient(135deg,#020617_0%,#000000_45%,#0f172a_100%)] bg-[length:300%_300%]" />

      <div className="container relative z-10 px-6 text-white">
        <div className="sm:w-[70%] md:w-[57%]">
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
            className="my-12 w-fit !border-error !bg-error !text-white hover:!border-white hover:!bg-white hover:!text-error"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-white opacity-[0.2]">
        <div className="container absolute inset-0 bg-[url('/images/form.webp')] bg-contain bg-right bg-no-repeat" />
      </div>
    </section>
  );
};

export default Hero;
