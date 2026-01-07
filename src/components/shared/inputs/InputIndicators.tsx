type Props = {
  required?: boolean;
  unique?: boolean;
};
const InputIndicators = (props: Props) => {
  return (
    <>
      {props.required && <span className="text-error ml-0.5">*</span>}
      {props.unique && <span className="text-error ml-0.5">!</span>}
    </>
  );
};

export default InputIndicators;
