const ProtocolsDocPage = () => {
  return (
    <div className="p-10">
      <p className="mb-20 text-center font-bold">
        Korzystanie z bazy materiałów ze sporów zbiorowych
      </p>
      <p className="mx-auto mb-10 w-full md:w-1/2">
        1. Przejdź do zakładki &quot;Protokoły&quot;, a następnie kliknij
        przycisk &quot;Dodaj protokół&quot;. <br /> 2. Uzupełnij i zapisz
        podstawowe informacje dotyczące sporu zbiorowego.
      </p>
      <video controls preload="metadata" className="mx-auto w-full md:w-1/2">
        <source src="/videos/elo.mp4" type="video/mp4" />
        Twoja przeglądarka nie obsługuje odtwarzacza wideo.
      </video>

      <p className="mx-auto mb-10 mt-20 w-full md:w-1/2">
        3. Załącz dokumenty i materiały dotyczące sporu zbiorowego oraz dodaj
        powiązane linki
      </p>
      <video controls preload="metadata" className="mx-auto w-full md:w-1/2">
        <source src="/videos/elo.mp4" type="video/mp4" />
        Twoja przeglądarka nie obsługuje odtwarzacza wideo.
      </video>

      <p className="mx-auto mb-10 mt-20 w-full md:w-1/2">
        4. Przeglądaj listę sporów zbiorowych i edytuj informacje dotyczące
        sporów utworzonych przez Twoją organizację
      </p>
      <video
        controls
        preload="metadata"
        className="mx-auto mb-20 w-full md:w-1/2"
      >
        <source src="/videos/elo.mp4" type="video/mp4" />
        Twoja przeglądarka nie obsługuje odtwarzacza wideo.
      </video>
    </div>
  );
};

export default ProtocolsDocPage;
