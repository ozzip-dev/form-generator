import { InfoIcon } from "@/components/shared";

const AcceptedValuesInfoBox = () => {
  return (
    <InfoIcon>
      <div>
        Opcjonalnie:
        <br />
        Ustal możliwe odpowiedzi dla pola, np. numery PESEL, identyfikatory
        pracownicze, itd.
        <br />
        Wpisanie odpowiedzi innej niż zdefiniowane wartości uniemożliwi wysłanie
        formularza.
      </div>
    </InfoIcon>
  );
};

export default AcceptedValuesInfoBox;
