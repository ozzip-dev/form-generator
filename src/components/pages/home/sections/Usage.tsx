const Usage = () => {
  const usageCases: string[] = [
    "Opinie o warunkach pracy",
    "Konsultacje regulaminów",
    "Głosowanie nad planowanymi działaniami",
    "Spotkania i wydarzenia",
    "Ankiety w zakładach pracy",
    "Wybory",
    "Petycje",
  ];

  return (
    <section className="bg-bg_dark py-32">
      <div className="overflow-hidden">
        <div className="animate-marquee-right flex w-max">
          {[0, 1].map((group) => (
            <ul
              key={group}
              className="flex shrink-0 items-center gap-6 pr-6"
              aria-hidden={group === 1}
            >
              {usageCases.map((item) => (
                <li
                  key={item}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-gray bg-bg_light px-6 py-2 text-lg font-semibold"
                >
                  <span className="text-accent_light" aria-hidden="true">
                    ✦
                  </span>
                  <span>{item}</span>
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
