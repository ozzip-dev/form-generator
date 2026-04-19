type Props = {
  title?: string;
};

const CreatedFormTemplateHeader = ({ title = "" }: Props) => {
  return (
    <div
      className="mb-8 w-full py-8 text-center"
      style={{ backgroundColor: "var(--color-accent_light)" }}
    >
      <p className="text-4xl font-bold text-black">Szkic formularza: {title}</p>
    </div>
  );
};

export default CreatedFormTemplateHeader;
