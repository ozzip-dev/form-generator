const Usage = () => {
  return (
    <section className="">
      <div className="container pb-20 pt-16">
        <div className="mx-auto w-4/5">
          <h2 className="text-center text-lg">
            Zastosowania w organizacjach związkowych
          </h2>
          <p className="mt-4 text-center">
            Zamiast maili i chaosu jeden uporządkowany system
          </p>{" "}
        </div>
        <div className="mt-28 flex flex-col gap-6 md:flex-row">
          <div className="ml-auto flex flex-1 flex-col gap-5 p-6">
            <div className="flex items-center gap-6">
              <div className="h-[40px] w-[70px] rounded-sm bg-slate-500"></div>
              <p>Zbieranie opinii o warunkach pracy</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-[40px] w-[70px] rounded-sm bg-slate-500"></div>
              <p>Konsultacje w sprawie regulaminów</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-[40px] w-[70px] rounded-sm bg-slate-500"></div>
              <p>Szybkie ankiety w zakładach pracy</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-5 p-6">
            <div className="flex items-center gap-6">
              <div className="h-[40px] w-[70px] rounded-sm bg-slate-500"></div>
              <p>Głosowanie na temat akcji protestacyjnej</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-[40px] w-[70px] rounded-sm bg-slate-500"></div>
              <p>Organizacja spotkań i wydarzeń</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-[40px] w-[70px] rounded-sm bg-slate-500"></div>
              <p>Organizacja spotkań i gebeurteneń</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Usage;
