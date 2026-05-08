import Loader from "../loaders/Loader";

const VARIANTS = {
  primary: "btn-primary",
  "primary-rounded": "btn-primary-rounded",
  ghost: "",
};

type Props = {
  variant?: "primary" | "primary-rounded" | "ghost";
  isLoading?: boolean;
  message?: string;
  icon?: React.ReactNode;
  onClickAction?: (...args: any[]) => void | Promise<void>;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

const Button = (props: Props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClickAction}
      disabled={props.disabled || props.isLoading}
      aria-label={props.ariaLabel}
      className={`relative block cursor-pointer select-none rounded-sm bg-transparent text-white transition-all duration-150 ease-out active:scale-[0.98] active:brightness-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[props.variant || "primary"]} ${props.className ? props.className : ""} `}
    >
      <span
        className={`${props.isLoading ? "opacity-0" : "opacity-100"} flex items-center justify-center gap-2`}
      >
        {props.icon}
        {props.message}
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
