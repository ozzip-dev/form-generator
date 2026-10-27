import Link from "next/link";

const VARIANTS = {
  primary: "btn-primary",
  "primary-rounded": "btn-primary-rounded text-white",
  "empty-white": "btn-empty-white",
  "empty-accent": "btn-empty-acccent",
  underline: "btn-underline",
  ghost: "",
};

type Props = {
  link: string;
  target?: string;
  rel?: string;
  className?: string;
  variant?:
    | "primary"
    | "primary-rounded"
    | "empty-white"
    | "empty-accent"
    | "underline"
    | "ghost";
  ariaLabel?: string;
  ariaCurrent?: "page";
  children?: React.ReactNode;
};

export default function ButtonLink({
  link,
  target,
  rel,
  className,
  variant = "ghost",
  ariaLabel,
  ariaCurrent,
  children,
}: Props) {
  return (
    <Link
      href={link}
      target={target}
      rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      className={`group block text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${VARIANTS[variant]} ${className ?? ""} `}
    >
      {children}
    </Link>
  );
}
