import Link from "next/link";
import Icon from "./icons/Icon";

type Props = {
  isDark?: boolean;
};

const BackToHomeLink = ({ isDark = true }: Props) => {
  return (
    <Link
      href="/"
      className={`flex shrink-0 items-center gap-3 ${isDark ? "text-font_dark" : "text-white"}`}
    >
      <Icon
        icon="fp_black"
        size={18}
        className={isDark ? "bg-font_dark" : "bg-white"}
      />
      <span className="text-lg font-bold uppercase tracking-wide">
        Formy Pracy
      </span>
    </Link>
  );
};

export default BackToHomeLink;
