import Link from "next/link";

type Props = {
  message: string;
  link: string;
  target?: string;
  rel?: string;
};

export default function ButtonLink(props: Props) {
  return (
    <Link
      href={props.link}
      className="block text-base_bold"
      target={props.target}
      rel={props.rel}
    >
      {props.message}
    </Link>
  );
}
