type Props = {
  name: string;
  onChange: any;
  checkedValue: string | boolean;
  checkboxLabel?: string;
  isSubmitting?: boolean;
  labelClassName?: string;
};

const Checkbox = (props: Props) => {
  return (
    <label
      className={`flex w-full cursor-pointer items-center gap-3 ${
        props.isSubmitting ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      <div className="relative inline-block h-6 w-12">
        <input
          type="checkbox"
          id={props.name}
          checked={!!props.checkedValue}
          disabled={props.isSubmitting}
          onChange={props.onChange}
          aria-label={`${props.checkboxLabel || props.name}`}
          className="peer sr-only"
        />
        <div className="absolute left-0 top-0 h-full w-full rounded-full bg-font_light transition-colors peer-checked:bg-accent" />
        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-6" />
      </div>

      <span className={`${props.labelClassName ? props.labelClassName : ""}`}>
        {props.checkboxLabel ? props.checkboxLabel : props.name}
      </span>
    </label>
  );
};

export default Checkbox;
