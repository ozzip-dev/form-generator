type Props = {
  message: string;
};

const SectionHeader = (props: Props) => {
  return (
    <div className="text-center md:text-left text-lg font-bold mb-6">
      {props.message}
    </div>
  );
};

export default SectionHeader;
