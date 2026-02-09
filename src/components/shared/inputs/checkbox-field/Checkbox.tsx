type Props = {
  name: string;
  onChange: any;
  checkedValue: string | boolean;
  checkboxLabel?: string;
  isSubmitting?: boolean;
};

const Checkbox = (props: Props) => {
  return (
    <label
      className={`w-full flex items-center justify-between gap-3 cursor-pointer ${props.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
    >

      <span>{props.checkboxLabel ? props.checkboxLabel : props.name}</span>
      <div className="relative inline-block w-12 h-6">
        <input
          type="checkbox"
          checked={!!props.checkedValue}
          disabled={props.isSubmitting}
          onChange={props.onChange}
          className="peer sr-only"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-font_light rounded-full peer-checked:bg-accent transition-colors" />
        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
      </div>


    </label>
  );
};

export default Checkbox;
