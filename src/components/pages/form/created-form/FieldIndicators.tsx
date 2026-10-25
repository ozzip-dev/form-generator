type Props = {
  isRequiredInput: boolean;
  isUniqueInput: boolean;
  isHiddenInput: boolean;
};

const FieldIndicators = ({
  isRequiredInput,
  isUniqueInput,
  isHiddenInput,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {(isRequiredInput || isUniqueInput || isHiddenInput) && (
        <div className="text-xs text-error">* Odpowiedź wymagana</div>
      )}
      {(isUniqueInput || isHiddenInput) && (
        <div className="flex gap-1 text-xs text-error">
          ! Ponowne przekazanie tej samej odpowiedzi zablokuje wysłanie
          formularza{" "}
        </div>
      )}
      {isHiddenInput && (
        <div className="flex gap-1 text-xs text-error">
          X Odpowiedź tajna, niewidoczna w wynikach{" "}
        </div>
      )}
    </div>
  );
};

export default FieldIndicators;
