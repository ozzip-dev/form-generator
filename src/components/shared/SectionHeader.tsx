type Props = {
  message: string | React.ReactNode;
  className?: string;
  headerTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const SectionHeader = (props: Props) => {
  const Tag = props.headerTag || "h2";

  return (
    <Tag
      className={`mb-6 text-center text-lg md:text-left ${
        props.className ? props.className : ""
      }`}
    >
      {props.message}
    </Tag>
  );
};

export default SectionHeader;
