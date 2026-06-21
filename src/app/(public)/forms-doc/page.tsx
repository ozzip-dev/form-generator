import { Card } from "@/components/shared";

const FormsDocPage = () => {
  return (
    <div className="p-10">
      <h1 className="mb-20 text-center text-xl">Tworzenie formularzy</h1>

      <Card className="mx-auto max-w-[55rem]">
        <h2 className="mx-0 mb-10 w-full text-base font-semibold">
          1. Wybierz gotowy szablon lub utwórz formularz od podstaw
        </h2>
        <video controls preload="metadata" className="mx-0 w-full">
          <source src="/videos/form-1.mp4" type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo.
        </video>
      </Card>
      <div className="flex flex-wrap justify-center gap-5">
        <div>
          {" "}
          <p className="mt-20 text-center text-accent">Gotowy szablon</p>
          <Card className="mx-auto mt-10 max-w-[55rem]">
            <h2 className="mx-0 mb-10 w-full text-base font-semibold">
              2. Edytuj utworzone pola
            </h2>
            <video controls preload="metadata" className="mx-0 w-full">
              <source src="/videos/form-2.mp4" type="video/mp4" />
              Twoja przeglądarka nie obsługuje odtwarzacza wideo.
            </video>
          </Card>
        </div>
        <div>
          <p className="mt-20 text-center text-accent">Formularz od zera</p>
          <Card className="mx-auto mt-10 max-w-[55rem]">
            <h2 className="mx-0 mb-10 w-full text-base font-semibold">
              2. Dodawaj pytania i buduj strukturę formularza
            </h2>
            <video controls preload="metadata" className="mx-0 w-full">
              <source src="/videos/form-3.mp4" type="video/mp4" />
              Twoja przeglądarka nie obsługuje odtwarzacza wideo.
            </video>
          </Card>
        </div>
      </div>

      <Card className="mx-auto mt-20 max-w-[55rem]">
        <h2 className="mx-0 mb-10 w-full text-base font-semibold">
          3. Skonfiguruj adres, kategorię i tryb wyników formularza. <br />
          4. Dodaj grafikę wyświetlaną w nagłówku formularza
        </h2>
        <video controls preload="metadata" className="mx-0 w-full">
          <source src="/videos/form-4.mp4" type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo.
        </video>
      </Card>

      <Card className="mx-auto mt-20 max-w-[55rem]">
        <h2 className="mx-0 mb-10 w-full text-base font-semibold">
          5. Przejdz do zakładki &quot;Kontakty&quot; i skontaktuj się z
          organizacjami, które tworzyły formularze, celem wymieny doświadczań.
        </h2>
        <video controls preload="metadata" className="mx-0 w-full">
          <source src="/videos/form-5.mp4" type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo.
        </video>
      </Card>

      <Card className="mx-auto mt-20 max-w-[55rem]">
        <h2 className="mx-0 mb-10 w-full text-base font-semibold">
          6. Przejdź do zakładki &quot;Podgląd&quot;, aby sprawdzić wygląd
          formularza. Link do podglądu możesz przesłać innym osobom celem jego
          przetestowania. <br />
          7. Opublikuj formularz online, aby udostępnić go odbiorcom.
        </h2>
        <video controls preload="metadata" className="mx-0 w-full">
          <source src="/videos/form-6.mp4" type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo.
        </video>
      </Card>

      <Card className="mx-auto mt-20 max-w-[55rem]">
        <h2 className="mx-0 mb-10 w-full text-base font-semibold">
          8. Przejdź do zakładki &quot;Wyniki&quot;, aby na bierząco śledzić
          odpowiedzi i analizować wyniki. <br /> 9. Pobierz podsumowanie wyników
          lub pełne dane odpowiedzi z formuklarzy.
        </h2>
        <video controls preload="metadata" className="mx-0 w-full">
          <source src="/videos/form-7.mp4" type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo.
        </video>
      </Card>

      <Card className="mx-auto mt-20 max-w-[55rem]">
        <h2 className="mx-0 mb-10 w-full text-base font-semibold">
          10. Zamknij formularz i zakończ zbieranie odpowiedzi
        </h2>
        <video controls preload="metadata" className="mx-0 w-full">
          <source src="/videos/form-8.mp4" type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo.
        </video>
      </Card>
    </div>
  );
};

export default FormsDocPage;
