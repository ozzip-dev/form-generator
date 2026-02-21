const ResultsMode = (props: { resultVisibility: string }) => {
  return (
    <div className="mb-6 text-center text-sm">
      {props.resultVisibility === "secret" ? (
        <div className="">
          <span className="mr-2 font-semibold">Tajny tryb zapisu danych:</span>
          zbiorcze podsumowanie odpowiedzi bez powiązania ich z pojedynczymi
          formularzami.
        </div>
      ) : (
        <div className="flex">
          <span className="mr-2 font-semibold">Jawny tryb zapisu danych:</span>
          zbiorcze podsumowanie odpowiedzi oraz odpowiedzi z każdego
          pojedynczego formularza.
        </div>
      )}
    </div>
  );
};

export default ResultsMode;
