type Props = {
  listItems: Record<string, string>;
  truncateText?: boolean;
};

const ResponsiveList = ({ listItems, truncateText = true }: Props) => {
  return (
    <ul className="md:flex md:flex-row">
      {Object.entries(listItems).map(([key, value]) => {
        return (
          <li
            key={JSON.stringify([key, value])}
            className="mb-2 flex min-w-0 md:mb-0 md:flex-1"
          >
            <div className="w-2/5 font-semibold md:hidden">{key}</div>
            <div
              className={`w-3/5 pr-2 md:w-full ${truncateText ? "truncate" : ""}`}
            >
              {value}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ResponsiveList;
