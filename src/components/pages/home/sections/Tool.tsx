const Tool = () => {
  return (
    <section className="container">
      <div className="container pb-20 pt-16">
        <div className="mx-auto w-4/5">
          <h2 className="text-center text-lg">
            Narzędzie stworzone dla organizacji, które chcą działać szybko i
            wspólnie podejmować decyzje
          </h2>
          <p className="mt-4 text-center">
            Aplikacja pozwala na szybkie tworzenie formularzy i ankiet,
            zbieranie opinii, organizowanie głosowań i wyborów online.
          </p>{" "}
        </div>

        <div className="mt-16 gap-10 sm:flex sm:flex-wrap sm:justify-center">
          <div className="sm:w-[180px]">
            <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500"> </div>
            <p className="text-center text-sm">
              Twórz formularze w kilka minut bez wiedzy technicznej
            </p>
          </div>
          <div className="sm:w-[180px]">
            <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500"> </div>
            <p className="text-center text-sm">
              Zbieraj odpowiedzi wyniki aktualizują się automatycznie
            </p>
          </div>
          <div className="sm:w-[180px]">
            <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500"> </div>
            <p className="text-center text-sm">
              Analizuj wyniki i eksportuj raporty Excel, PDF, wykresy
            </p>
          </div>{" "}
          <div className="sm:w-[180px]">
            <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500"> </div>
            <p className="text-center text-sm">
              Idealna dla organizacji związkowych i stowarzyszeń
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tool;
