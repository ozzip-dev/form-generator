type Props = {
  listItems: Record<string, string>;
};

const ResponsiveList = (props: Props) => {
  return (
    <ul className="md:flex md:flex-row md:w-4/5">
      {Object.entries(props.listItems).map((item) => {
        return (
          <li
            key={JSON.stringify(item)}
            className="flex  md:flex-1 min-w-0 mb-2 md:mb-0"
          >
            <div className="w-2/5 md:hidden font-bold">{item[0]}</div>
            <div className="pr-2 truncate w-3/5 md:w-full">{item[1]}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default ResponsiveList;
