type Props = {
  header: string;
  subheader?: string;
};

const SectionHeader = (props: Props) => {
  return (
    <div className="mx-auto w-4/5 text-center">
      <h2 className="mb-8 text-xl font-semibold">{props.header}</h2>

      {!!props.subheader && <div className="text-md">{props.subheader}</div>}
    </div>
  );
};

export default SectionHeader;
