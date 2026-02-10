import Link from "next/link";

type Props = {
  message: string;
  messageLink: string;
  link: string;
};

export default function FormAuthFooter(props: Props) {
  return (
    <div className="w-full text-sm text-center px-4 py-2">
      {props.message}{" "}
      <Link
        href={props.link}
        className="text-blue-600 hover:underline hover:decoration-blue-600"
      >
        {props.messageLink}
      </Link>
    </div>
  );
}
