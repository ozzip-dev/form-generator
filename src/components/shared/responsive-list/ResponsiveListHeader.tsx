type Props = {
  headers: string[];
};

const ResponsiveListHeader = (props: Props) => {
  return (
    <div className="hidden md:flex md:w-full">
      {props.headers.map((header, idx) => (
        <div key={idx} className="flex-1 font-semibold">
          {header}
        </div>
      ))}
    </div>
  );
};

export default ResponsiveListHeader;
