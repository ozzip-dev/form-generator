type Props = {
  message: string | React.ReactNode;
  className?: string;
};

const SectionHeader = (props: Props) => {
  return (
    <div
      className={`mb-6 text-center text-lg font-bold md:text-left ${props.className ? props.className : ""}`}
    >
      {props.message}
    </div>
  );
};

export default SectionHeader;
