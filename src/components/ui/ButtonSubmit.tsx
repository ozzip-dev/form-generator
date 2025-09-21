import Loader from "./Loader";

type Props = {
  isSubmitting: boolean;
  text: string;
};

export default function ButtonSubmit(props: Props) {
  return (
    <button
      type="submit"
      disabled={props.isSubmitting}
      className={`
        flex items-center justify-center
        w-full rounded-lg px-4 py-2
        font-medium text-white
        bg-blue-500 hover:bg-blue-600
        disabled:opacity-70 disabled:cursor-not-allowed
        transition-colors duration-200
        shadow-sm 
        h-10   /* <- stała wysokość przycisku */
      `}
    >
      {props.isSubmitting ? <Loader /> : props.text}
    </button>
  );
}
