const Steps = () => {
  return (
    <section className="bg-font_light">
      <div className="container pb-20 pt-16">
        <div className="mx-auto w-4/5">
          <h2 className="text-center text-lg">Jak to działa?</h2>
          <p className="mt-4 text-center">
            Od pomysłu do wyników w 4 krokach
          </p>{" "}
        </div>

        <div className="mt-16 gap-10 sm:flex sm:flex-wrap sm:justify-center">
          <div className="sm:w-[180px]">
            <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500">
              pierwszy
            </div>
            <p className="text-center text-sm">eeeeeeeeee</p>
          </div>
          <div className="sm:w-[180px]">
            <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500">
              drugi
            </div>
            <p className="text-center text-sm">eeeeeeeeee</p>
          </div>
          <div className="sm:w-[180px]">
            <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500">
              trzeci
            </div>
            <p className="text-center text-sm">eeeeeeeeeeeeee</p>
          </div>{" "}
          <div className="sm:w-[180px]">
            <div className="mx-auto mb-6 h-[70px] w-[70px] bg-slate-500">
              czwarty
            </div>
            <p className="text-center text-sm">eeeeeeeeee</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
