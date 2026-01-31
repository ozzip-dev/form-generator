import Link from "next/link";

const VARIANTS = {
  primary: "btn-primary",
  "primary-rounded": "btn-primary-rounded text-white",
  ghost: "",
};

type Props = {
  message: string;
  link: string;
  target?: string;
  rel?: string;
  className?: string;
  variant?: "primary" | "primary-rounded" | "ghost";
};

export default function ButtonLink(props: Props) {
  return (
    <Link
      href={props.link}
      className={`block text-center
        ${VARIANTS[props.variant || "ghost"]}
        ${props.className}`}
      target={props.target}
      rel={props.rel}
    >
      {props.message}
    </Link>
  );
}
