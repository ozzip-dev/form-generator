type Props = {
  name: string;
  onChange: any;
  checkedValue: string | boolean;
  checkboxLabel?: string;
};

const Checkbox = (props: Props) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative inline-block w-12 h-6">
        <input
          type="checkbox"
          checked={!!props.checkedValue}
          onChange={props.onChange}
          className="peer sr-only"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full peer-checked:bg-sky-500 transition-colors" />
        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
      </div>

      <span>{props.checkboxLabel ? props.checkboxLabel : props.name}</span>
    </label>
  );
};

export default Checkbox;
