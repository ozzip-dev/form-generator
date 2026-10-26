type Props = {
  message: string | React.ReactNode;
  className?: string;
  headerTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  subheader?: string;
};

const SectionHeader = (props: Props) => {
  const Tag = props.headerTag || "h2";

  return (
    <>
      {" "}
      <Tag
        className={`text-lg font-bold ${
          props.className ? props.className : ""
        }`}
      >
        {props.message}
      </Tag>
      {props.subheader && <p className="text-font-light">{props.subheader}</p>}
    </>
  );
};

export default SectionHeader;
