type Props = {
  required?: boolean;
  unique?: boolean;
  hidden?: boolean;
};
const InputIndicators = (props: Props) => {
  return (
    <>
      {props.required && <span className="ml-0.5 text-error">*</span>}
      {props.unique && <span className="ml-0.5 text-error">!</span>}
      {props.hidden && <span className="ml-0.5 text-error">X</span>}
    </>
  );
};

export default InputIndicators;
