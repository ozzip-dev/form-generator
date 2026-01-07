type Props = {
  description?: string;
};

const InputDescription = (props: Props) => {
  return (
    <div className="mb-1 text-sm text-font_light">{props.description}</div>
  );
};

export default InputDescription;
