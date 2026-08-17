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
      className={`flex cursor-pointer gap-3 ${
        props.isSubmitting ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      <div className="relative mt-1 h-6 min-w-12">
        <input
          type="checkbox"
          id={props.name}
          checked={!!props.checkedValue}
          disabled={props.isSubmitting}
          onChange={props.onChange}
          aria-label={`${props.checkboxLabel || props.name}`}
          className="peer sr-only"
        />
        <div className="absolute left-0 top-0 h-full w-full rounded-full bg-font_light transition-colors peer-checked:bg-accent peer-focus:ring-2 peer-focus:ring-accent peer-focus:ring-offset-2" />
        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-6" />
      </div>

      <div className={`${props.labelClassName ? props.labelClassName : ""}`}>
        {props.checkboxLabel ? props.checkboxLabel : props.name}
      </div>
    </label>
  );
};

export default Checkbox;
