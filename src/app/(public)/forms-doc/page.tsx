import { Card } from "@/components/shared";
import VideoCard from "@/components/shared/VideoCard";

const FormsDocPage = () => {
  return (
    <div className="mb-20 p-10">
      <h1 className="text-bo mb-20 text-center text-xl font-extrabold">
        Tworzenie formularzy
      </h1>

      <div className="flex flex-col gap-24">
        <VideoCard
          message="1. Wybierz gotowy szablon lub utwórz formularz od podstaw"
          video="/videos/form-1.mp4"
        />

        <div className="flex flex-wrap justify-center gap-5">
          <div>
            {" "}
            <p className="mb-11 text-center font-extrabold">Gotowy szablon</p>
            <VideoCard
              message="2. Edytuj utworzone pola"
              video="/videos/form-2.mp4"
            />
          </div>
          <div>
            <p className="mb-11 text-center font-extrabold">
              Formularz od zera
            </p>

            <VideoCard
              message="2. Dodawaj pytania i buduj strukturę formularza"
              video="/videos/form-3.mp4"
            />
          </div>
        </div>

        <VideoCard
          message={
            <>
              3. Skonfiguruj adres, kategorię i tryb wyników formularza. <br />
              4. Dodaj grafikę wyświetlaną w nagłówku formularza
            </>
          }
          video="/videos/form-4.mp4"
        />

        <VideoCard
          message='5. Przejdz do zakładki "Kontakty" i skontaktuj się z organizacjami, które tworzyły formularze, celem wymieny doświadczań.'
          video="/videos/form-5.mp4"
        />

        <VideoCard
          message={
            <>
              6. Przejdź do zakładki &quot;Podgląd&quot;, aby sprawdzić wygląd
              formularza. Link do podglądu możesz przesłać innym osobom celem
              jego przetestowania. <br />
              7. Opublikuj formularz online, aby udostępnić go odbiorcom.
            </>
          }
          video="/videos/form-6.mp4"
        />

        <VideoCard
          message={
            <>
              8. Przejdź do zakładki &quot;Wyniki&quot;, aby na bierząco śledzić
              odpowiedzi i analizować wyniki. <br /> 9. Pobierz podsumowanie
              wyników lub pełne dane odpowiedzi z formuklarzy.
            </>
          }
          video="/videos/form-7.mp4"
        />

        <VideoCard
          message="10. Zamknij formularz i zakończ zbieranie odpowiedzi"
          video="/videos/form-8.mp4"
        />
      </div>
    </div>
  );
};

export default FormsDocPage;
