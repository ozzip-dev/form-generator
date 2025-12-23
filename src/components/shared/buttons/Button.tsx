import Loader from "../loaders/Loader";

type Props = {
  isLoading?: boolean;
  message?: string;
  icon?: React.ReactNode;
  onClickAction?: (...args: any[]) => void | Promise<void>;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
};

const Button = (props: Props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClickAction}
      disabled={props.disabled || props.isLoading}
      className={`
      relative
      rounded-lg
      px-16 py-2
      text-white
      bg-accent_opacity hover:bg-accent
      disabled:opacity-70 disabled:cursor-not-allowed
      transition-colors duration-200
      block
      m-auto
      ${props.className}
    `}
    >
      <span className={props.isLoading ? "opacity-0" : "opacity-100"}>
        {props.message || props.icon}
      </span>

      {props.isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader size="lg" />
        </span>
      )}
    </button>
  );
};

export default Button;
