import Loader from "../loaders/Loader";

type Props = {
  isLoading?: boolean;
  text: string;
  onClickAction: (...args: any[]) => void | Promise<void>;
};

const ButtonClick = (props: Props) => {
  return (
    <button
      onClick={props.onClickAction}
      disabled={props.isLoading}
      className={`
      flex items-center justify-center
      w-full rounded-lg px-4 py-2
      font-medium text-white
      bg-sky-500 hover:bg-sky-600
      disabled:opacity-70 disabled:cursor-not-allowed
      transition-colors duration-200
      shadow-sm 
      h-10  
    `}
    >
      {props.isLoading ? <Loader /> : props.text}
    </button>
  );
};

export default ButtonClick;
