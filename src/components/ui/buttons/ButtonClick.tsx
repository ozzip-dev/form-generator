import Loader from "../loaders/Loader";

// TODO Krzysztof: zmieńmy nazwę na Button i dodajmy props typu 'type': 'submit' | 'button'
// wtedy będziemy mieli jeden uniwersalny komponent do przycisków z którego będą korzystać pozostałe
// Nazwy pozostałych przycisków zmieńmy na SubmitButton, LinkButton itd.

type Props = {
  isLoading?: boolean;
  message?: string;
  onClickAction: (...args: any[]) => void | Promise<void>;
  icon?: React.ReactNode;
};

const ButtonClick = (props: Props) => {
  return (
    <button
      type="button"
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
      {
        props.isLoading ? (
          <Loader />
        ) : props.message || props.icon
      }
    </button>
  );
};

export default ButtonClick;
