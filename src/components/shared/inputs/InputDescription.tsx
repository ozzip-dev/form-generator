type Props = {
  description?: string;
};

const InputDescription = (props: Props) => {
  if (!props.description) return null;
  return (
    <div
      className="mb-1 text-sm text-font_light"
      dangerouslySetInnerHTML={{ __html: props.description }}
    />
  );
};

export default InputDescription;
