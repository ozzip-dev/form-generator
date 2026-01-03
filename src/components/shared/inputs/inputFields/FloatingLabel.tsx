type Props = {
  floatingLabel: string;
  name: string;
  required: boolean;
};

const FloatingLabel = (props: Props) => (
  <label
    htmlFor={props.name}
    className="bg-white px-1 pointer-events-none absolute left-3
                 origin-left transition-all duration-200

                 // empty not focus
                 peer-placeholder-shown:top-3
                 peer-placeholder-shown:text-base

                // focus - label up 
                 peer-focus:-top-3
                 peer-focus:text-xs
                 peer-focus:text-accent

                // not focus - label up
                 -top-3 text-xs"
  >
    {props.floatingLabel}
    {props.required && <span className="text-red ml-0.5">*</span>}
  </label>
);

export default FloatingLabel;
