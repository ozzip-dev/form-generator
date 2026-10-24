import Link from "next/link";
import Icon from "./icons/Icon";

const BackToHomeLink = () => {
  return (
    <Link
      href="/"
      className={`text-font-dark} flex shrink-0 items-center gap-3`}
    >
      <Icon icon="fp_black" size={18} className={"bg-accent"} />
      <span className="text-lg font-bold uppercase tracking-wide">
        Formy Pracy
      </span>
    </Link>
  );
};

export default BackToHomeLink;
