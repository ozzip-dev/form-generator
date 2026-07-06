import { Card, VideoCard } from "@/components/shared";

const ProtocolsDocPage = () => {
  return (
    <div className="mb-20 p-10">
      <h1 className="text-bo mb-20 text-center text-xl font-extrabold">
        Korzystanie z archiwum materiałów sporów zbiorowych
      </h1>

      <div className="flex flex-col gap-24">
        <VideoCard
          message={
            <>
              1. Przejdź do zakładki &quot;Protokoły&quot;, a następnie kliknij
              przycisk &quot;Dodaj protokół&quot;. <br /> 2. Uzupełnij i zapisz
              podstawowe informacje dotyczące sporu zbiorowego.
            </>
          }
          video="/videos/elo3.mp4"
        />

        <VideoCard
          message="3. Załącz dokumenty i materiały dotyczące danej fazy sporu zbiorowego
          i dodaj powiązane linki"
          video="/videos/elo4.mp4"
        />

        <VideoCard
          message="4. Przeglądaj listę sporów zbiorowych i edytuj informacje dotyczące
          sporów utworzonych przez Twoją organizację"
          video="/videos/elo5.mp4"
        />
      </div>
    </div>
  );
};

export default ProtocolsDocPage;
