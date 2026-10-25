import { Icon } from "@/components/shared";
import CardSmall from "@/components/shared/cards/CardSmall";
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
    <li className="">
      <CardSmall>
        <h3>
          <button
            id={`faq-button-${idx}`}
            className="flex w-full items-center justify-between gap-6 text-lg font-bold"
            aria-expanded={isOpen}
            aria-controls={`faq-panel-${idx}`}
            onClick={() => onToggle(idx)}
          >
            <div className="text-left">{header} </div>
            <Icon
              icon="angle"
              size={30}
              className={`bg-font-dark ml-auto w-10 shrink-0 ${isOpen ? "rotate-180 transition duration-300" : "rotate-0 transition duration-300"}`}
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
          <div className="text-font-light min-h-0 text-sm">{content}</div>
        </div>
      </CardSmall>
    </li>
  );
};

export default FaqItem;
