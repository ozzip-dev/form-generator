import Link from "next/link";

type Props = {
  text1: string;
  text2: string;
  link: string;
};

export default function FormAuthFooter(props: Props) {
  return (
    <div className="w-full text-center px-4 py-2">
      {props.text1}{" "}
      <Link
        href={props.link}
        className="text-blue-600 hover:underline hover:decoration-blue-600"
      >
        {props.text2}
      </Link>
    </div>
  );
}
