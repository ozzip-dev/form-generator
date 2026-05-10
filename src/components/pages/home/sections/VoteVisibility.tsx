const VoteVisibility = () => {
  return (
    <section className="">
      <div className="container pb-20 pt-16">
        <div className="mx-auto w-4/5">
          <h2 className="text-center text-lg">
            Pełna kontrola nad sposobem głosowania
          </h2>
          <p className="mt-4 text-center">
            Każda organizacja może dostosować sposób zbierania odpowiedzi — od
            anonimowych ankiet po jawne głosowania członków. Dane pozostają w
            Twojej organizacji – pełna prywatność
          </p>{" "}
        </div>
        <div className="mt-28 flex flex-col-reverse gap-6 sm:flex-row">
          <div className="flex-1 rounded-sm bg-slate-500 text-white">image</div>
          <div className="flex-1 p-6">
            <div className="mb-6 font-semibold">Głosowanie anonimowe</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="mt-28 flex flex-col gap-6 sm:flex-row">
          <div className="flex-1 p-6">
            <div className="mb-6 font-semibold">Głosowanie jawne</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="flex-1 rounded-sm bg-slate-500 text-white">image</div>
        </div>
        <div className="mt-28 flex flex-col-reverse gap-6 sm:flex-row">
          <div className="flex-1 rounded-sm bg-slate-500 text-white">image</div>
          <div className="flex-1 p-6">
            <div className="mb-6 font-semibold">
              Głosowanie częściowo anonimowe
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoteVisibility;
