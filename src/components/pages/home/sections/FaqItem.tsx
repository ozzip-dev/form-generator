import { Icon } from "@/components/shared";
import { ReactNode } from "react";

type Props = {
  header: string;
  content: ReactNode;
  idx: number;
  isOpen: boolean;
  onToggle: (idx: number) => void;
};

const FaqItem = ({ header, content, idx, isOpen, onToggle }: Props) => {
  return (
    <li className="rounded-sm border bg-white text-left">
      <h3>
        <button
          id={`faq-button-${idx}`}
          className="flex w-full items-center justify-between gap-6 p-5 font-bold"
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${idx}`}
          onClick={() => onToggle(idx)}
        >
          {header}{" "}
          <Icon
            icon="angle"
            size={30}
            className={`ml-auto w-10 bg-font_dark ${isOpen ? "rotate-180 transition duration-300" : "rotate-0 transition duration-300"}`}
          />
        </button>
      </h3>

      <div
        id={`faq-panel-${idx}`}
        role="region"
        aria-labelledby={`faq-button-${idx}`}
        className={`grid overflow-hidden transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 px-5 text-sm">{content}</div>
      </div>
    </li>
  );
};

export default FaqItem;
