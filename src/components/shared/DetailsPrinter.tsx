const isValidDateDMY = (value: string): boolean | undefined => {
  if (!value) return;
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return false;

  const [, day, month, year] = match.map(Number);

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

type Props = {
  label: string;
  value: string;
  labelClassName?: string
};

const DetailsPrinter = (props: Props) => {
  return (
    <div
      key={props.label}
      className="flex flex-col md:flex-row md:items-center text-sm pb-[1.7rem] md:mt-[1.7rem]"
    >
      <div className={`font-bold mb-1 md:mr-4 ${props.labelClassName}`}> {props.label}</div>

      <div className="border border-transparent min-w-[22ch] flex-1 p-2">
        {isValidDateDMY(props.value) && <div className="h-[2px]"> </div>}
        {props.value ? props.value : <span className="text-error">Brak</span>}
      </div>
    </div>
  );
};

export default DetailsPrinter;
