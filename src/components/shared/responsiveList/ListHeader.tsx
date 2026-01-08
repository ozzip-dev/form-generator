type Props = {
  headers: string[];
};

const ListHeader = (props: Props) => {
  return (
    <div className="hidden md:flex md:w-4/5 sticky top-0 bg-white">
      {props.headers.map((header, idx) => (
        <div key={idx} className="font-bold flex-1">
          {header}
        </div>
      ))}
    </div>
  );
};

export default ListHeader;
