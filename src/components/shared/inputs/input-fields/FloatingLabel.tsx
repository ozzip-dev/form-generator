type Props = {
  floatingLabel: string;
  name: string;
  required: boolean;
};

const FloatingLabel = (props: Props) => (
  <label
    htmlFor={props.name}
    className="// empty not focus // focus - label up // not focus - label up pointer-events-none absolute -top-[1.8rem] left-2 origin-left px-1 text-xs !font-medium transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-[1.8rem] peer-focus:text-xs peer-focus:text-accent"
  >
    {props.floatingLabel}
    {props.required && <span className="text-red ml-0.5">*</span>}
  </label>
);

export default FloatingLabel;
