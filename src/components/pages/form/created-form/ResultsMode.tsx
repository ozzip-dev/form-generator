const ResultsMode = (props: { resultVisibility: string }) => {
  return (
    <div className="mb-6 text-center text-sm">
      {props.resultVisibility === "secret" ? (
        <div>
          <span className="mr-2 font-semibold">Tajny tryb zapisu wyników:</span>
          zbiorcze podsumowanie odpowiedzi bez powiązania ich z pojedynczymi
          formularzami.
        </div>
      ) : (
        <div>
          <span className="mr-2 font-semibold">Jawny tryb zapisu danych:</span>
          odpowiedzi z każdego formularza oraz zbiorcze podsumowanie odpowiedzi.
        </div>
      )}
    </div>
  );
};

export default ResultsMode;
