import { Card } from "@/components/shared";

const ProtocolsDocPage = () => {
  return (
    <div className="p-10">
      <p className="mb-20 text-center text-xl">
        Korzystanie z bazy materiałów sporów zbiorowych
      </p>
      <Card className="mx-auto max-w-[70rem]">
        <p className="mx-0 mb-10 w-full">
          1. Przejdź do zakładki &quot;Protokoły&quot;, a następnie kliknij
          przycisk &quot;Dodaj protokół&quot;. <br /> 2. Uzupełnij i zapisz
          podstawowe informacje dotyczące sporu zbiorowego.
        </p>
        <video controls preload="metadata" className="mx-0 w-full">
          <source src="/videos/elo3.mp4" type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo.
        </video>
      </Card>

      <Card className="mx-auto mt-20 max-w-[70rem]">
        <p className="mx-auto mb-10">
          3. Załącz dokumenty i materiały dotyczące danej fazy sporu zbiorowego
          i dodaj powiązane linki
        </p>
        <video controls preload="metadata" className="mx-auto">
          <source src="/videos/elo4.mp4" type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo.
        </video>
      </Card>
      <Card className="mx-auto mt-20 max-w-[70rem]">
        <p className="mx-auto mb-10">
          4. Przeglądaj listę sporów zbiorowych i edytuj informacje dotyczące
          sporów utworzonych przez Twoją organizację
        </p>
        <video controls preload="metadata" className="mx-auto">
          <source src="/videos/elo5.mp4" type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo.
        </video>
      </Card>
    </div>
  );
};

export default ProtocolsDocPage;
