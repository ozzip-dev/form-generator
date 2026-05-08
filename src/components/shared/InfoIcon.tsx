"use client";

import { Icon } from "@/components/shared";
import { useId, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function InfoIcon({ children }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  return (
    <div className="relative ml-2">
      <button
        type="button"
        aria-describedby={tooltipId}
        className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsVisible(false);
          }
        }}
      >
        <Icon icon="info-circle" size={23} className="bg-accent" />
      </button>

      <div
        id={tooltipId}
        role="tooltip"
        className={`absolute -left-[18rem] top-10 z-50 rounded-sm border bg-bg_dark p-2 text-xs transition-opacity ${
          isVisible
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
