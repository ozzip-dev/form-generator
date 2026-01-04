const isValidDateDMY = (value: string): boolean => {
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
};

const DetailsPrinter = (props: Props) => {
  return (
    <div key={props.label} className="text-sm flex items-center gap-2 mb-2">
      <div className="font-bold mb-1">{props.label}</div>
      <div className="p-3 border border-transparent mt-3 mb-4">
        {isValidDateDMY(props.value) && <div className="h-[2px]"> </div>}
        {props.value}
      </div>
    </div>
  );
};

export default DetailsPrinter;
