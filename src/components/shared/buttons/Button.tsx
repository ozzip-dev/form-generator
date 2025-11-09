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
      disabled={props.disabled ? props.disabled : props.isLoading}
      className={`
      flex items-center justify-center
      w-full rounded-lg px-4 py-2
      font-medium text-white
      bg-sky-500 hover:bg-sky-600
      disabled:opacity-70 disabled:cursor-not-allowed
      transition-colors duration-200
      shadow-sm 
      h-10  
      ${props.className}
    `}
    >
      {props.isLoading ? <Loader /> : props.message || props.icon}
    </button>
  );
};

export default Button;
