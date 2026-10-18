type Props = {
  title?: string;
  header: string;
  subheader?: string;
  className?: string;
};

const SectionHeader = (props: Props) => {
  return (
    <div className={`md:w-4/5 ${props.className && props.className}`}>
      {!!props.title && (
        <div className="text-xs font-extrabold">{props.title}</div>
      )}
      <h2 className="my-4 text-2xl font-bold leading-none">{props.header}</h2>

      {!!props.subheader && (
        <div className="text-md text-font_light">{props.subheader}</div>
      )}
    </div>
  );
};

export default SectionHeader;
