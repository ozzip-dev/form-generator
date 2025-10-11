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
        w-full rounded-lg px-2 
        font-medium text-white
        bg-zinc-300 hover:bg-zinc-400
        transition-colors duration-200
        shadow-sm 
    
      `}
      >
        {props.text}
      </button>
    </Link>
  );
}
