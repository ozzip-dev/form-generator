import Link from "next/link";

type Props = {
  text: string;
  link: string;
};

export default function ButtonLink(props: Props) {
  return (
    <Link href={props.link} className="w-full block">
      <button
        type="submit"
        className={`
        flex items-center justify-center
        w-full rounded-lg px-4 py-2
        font-medium text-white
        bg-sky-500 hover:bg-sky-600
        transition-colors duration-200
        shadow-sm 
    
      `}
      >
        {props.text}
      </button>
    </Link>
  );
}
