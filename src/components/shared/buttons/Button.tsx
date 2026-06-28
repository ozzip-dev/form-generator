import { boolean } from "better-auth/*";
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
  "aria-expanded"?: boolean;
};

const Button = (props: Props) => {
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClickAction}
      disabled={props.disabled || props.isLoading}
      aria-label={props.ariaLabel}
      aria-busy={props.isLoading}
      aria-disabled={props.disabled || props.isLoading}
      aria-expanded={props["aria-expanded"]}
      className={`relative block cursor-pointer select-none rounded-sm bg-transparent text-white transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-[0.98] active:brightness-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[props.variant || "primary"]} ${props.className ? props.className : ""} `}
    >
      <span
        className={`${props.isLoading ? "opacity-0" : "opacity-100"} flex items-center justify-center gap-2`}
      >
        {props.icon}
        {props.message}
      </span>

      {props.isLoading && (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <Loader size="sm" />
        </span>
      )}

      {props.isLoading && (
        <span className="sr-only">Trwa wykonywanie operacji</span>
      )}
    </button>
  );
};

export default Button;
