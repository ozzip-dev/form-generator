import Link from "next/link";

type Props = {
  text: string;
  textLink: string;
  link: string;
};

export default function FormAuthFooter(props: Props) {
  return (
    <div className="w-full text-center px-4 py-2">
      {props.text}{" "}
      <Link
        href={props.link}
        className="text-blue-600 hover:underline hover:decoration-blue-600"
      >
        {props.textLink}
      </Link>
    </div>
  );
}
