import Loader from "../loaders/Loader";

const VARIANTS = {
  primary: "btn btn-primary",
  "primary-rounded": "btn btn-primary-rounded",
  ghost: "",
  icon: "",
};

type Props = {
  variant?: "primary" | "primary-rounded" | "ghost" | "icon";
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
      disabled:opacity-70 disabled:cursor-not-allowed
      transition-colors duration-200
      block
      m-auto
      ${VARIANTS[props.variant || "primary"]}
      ${props.className}
    `}
    >
      <span className={props.isLoading ? "opacity-0" : "opacity-100"}>
        {props.message || props.icon}
      </span>

      {props.isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader size="sm" />
        </span>
      )}
    </button>
  );
};

export default Button;
