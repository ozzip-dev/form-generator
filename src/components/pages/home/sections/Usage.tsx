const Usage = () => {
  const usageCases: string[] = [
    "Opinie o warunkach pracy",
    "Konsultacje regulaminów",
    "Głosowanie nad planowanymi działaniami",
    "Spotkania i wydarzenia",
    "Ankiety w zakładach pracy",
    "Wybory",
  ];

  return (
    <section className="bg-bg_dark py-40">
      <div className="overflow-hidden bg-accent py-5 text-white">
        <div className="animate-marquee-right flex w-max">
          {[0, 1].map((group) => (
            <ul
              key={group}
              className="flex shrink-0 items-center gap-10 pr-10"
              aria-hidden={group === 1}
            >
              {usageCases.map((item) => (
                <li
                  key={item}
                  className="flex shrink-0 items-center gap-10 text-lg font-semibold uppercase"
                >
                  <span>{item}</span>
                  <span className="text-accent_light" aria-hidden="true">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Usage;
