const FormsDocPage = () => {
  return (
    <div>
      <p className="text-center">
        Wybierz gotowy szablon lub utwórz formularz od podstaw
      </p>
      <div className="mx-auto mb-6 h-[170px] w-[170px] bg-slate-500"> </div>
      <div className="mt-10 flex justify-center gap-5">
        <div>
          {" "}
          <p className="text-center text-accent">
            Skorzystaj z gotowego szablonu
          </p>
          <p className="text-center">Edytuj utworzone pola</p>
          <div className="mx-auto mb-6 h-[170px] w-[170px] bg-slate-500"> </div>
        </div>
        <div>
          <p className="text-center text-accent">Utwórz formularz od zera</p>
          <p className="text-center">
            Dodawaj pytania i buduj strukturę formularza
          </p>
          <div className="mx-auto mb-6 h-[170px] w-[170px] bg-slate-500"> </div>
        </div>
      </div>

      <p className="m-auto mt-10 w-3/4 text-center">
        Skonfiguruj adres, kategorię i tryb wyników formularza. <br />
        Dodaj grafikę wyświetlaną w nagłówku formularza
      </p>
      <div className="mx-auto mb-6 h-[170px] w-[170px] bg-slate-500"> </div>

      <p className="m-auto mt-10 w-3/4 text-center">
        Skontaktuj się z organizacjami, które tworzyły formularze w tej samej
        kategorii, aby wymieniać się doświadczeniami
      </p>
      <div className="mx-auto mb-6 h-[170px] w-[170px] bg-slate-500"> </div>

      <p className="m-auto mt-10 w-3/4 text-center">
        Sprawdź podgląd formularza i opublikuj go online
      </p>
      <div className="mx-auto mb-6 h-[170px] w-[170px] bg-slate-500"> </div>

      <p className="m-auto mt-10 w-3/4 text-center">
        Śledź odpowiedzi i analizuj wyniki w czasie rzeczywistym. Pobierz
        podsumowanie wyników lub pełne dane odpowiedzi
      </p>
      <div className="mx-auto mb-6 h-[170px] w-[170px] bg-slate-500"> </div>
      <p className="m-auto mt-10 w-3/4 text-center">
        Zamknij formularz i zakończ zbieranie odpowiedzi
      </p>
      <div className="mx-auto mb-6 h-[170px] w-[170px] bg-slate-500"> </div>
    </div>
  );
};

export default FormsDocPage;
