import { ButtonLink } from "@/components/shared";

const Start = () => {
  return (
    <section className="relative isolate overflow-hidden bg-black py-20">
      {/* niebieska poświata, lewy górny róg */}
      <div className="absolute -left-[10%] -top-[30%] -z-10 h-[620px] w-[620px] rounded-full bg-[var(--color-accent-dark)] opacity-35 blur-[140px]" />

      {/* czerwona poświata, prawy dolny róg */}
      <div className="absolute -bottom-[30%] -right-[10%] -z-10 h-[620px] w-[620px] rounded-full bg-[var(--color-accent-dark)] opacity-55 blur-[140px]" />

      {/* szeroka poświata od dołu */}
      <div className="absolute -bottom-[260px] left-[5%] right-[5%] -z-10 h-[480px] rounded-full bg-[linear-gradient(90deg,var(--color-accent-dark),var(--color-accent-dark),var(--color-accent-dark))] opacity-50 blur-[130px]" />

      {/* szary połysk u góry */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0,color-mix(in_srgb,var(--color-accent-dark)_22%,transparent),transparent)]" />

      {/* tu Twoja treść */}

      <div className="container">
        <h2 className="my-8 bg-clip-text text-center text-2xl font-extrabold leading-tight text-transparent [background-image:linear-gradient(180deg,#fff_60%,var(--color-accent-dark)_100%)]">
          Zacznij od swojej sprawy{" "}
        </h2>
        {/* <div className="flex"> */}{" "}
        <ButtonLink
          link="/admin-cntact"
          variant="empty-white"
          message="Zarejestruj organizację"
          className="mx-auto w-fit"
        />
        {/* </div> */}
        <div>
          <h2 className="my-8 bg-clip-text text-center text-[18rem] font-black leading-tight tracking-tighter text-transparent [background-image:linear-gradient(180deg,var(--color-accent)_1%,var(--color-accent-dark)_100%)]">
            formypracy
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Start;
