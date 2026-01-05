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
    <div
      key={props.label}
      className="flex flex-col md:flex-row items-center text-sm mb-8 mx-auto md:mx-0 w-fit"
    >
      <div className="font-bold mb-1 md:mr-4">{props.label}</div>

      <div className=" border border-transparent p-3 ">
        {isValidDateDMY(props.value) && <div className="h-[2px]"> </div>}
        {props.value}
      </div>
    </div>
  );
};

export default DetailsPrinter;
