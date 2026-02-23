"use client";

import { Icon } from "@/components/shared";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const isActivationKey = (key: string) => key === " " || key === "Enter";

export default function InfoIcon(props: Props) {
  const [isActive, setIsActive] = useState(false);

  const handleActivationKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isActive) {
      e.preventDefault();
      setIsActive(false);
    } else if (isActivationKey(e.key)) {
      e.preventDefault();
      if (e.type === "keydown") {
        setIsActive(true);
      }
    }
  };

  return (
    <div
      className={`group relative ml-2 cursor-help rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        isActive ? "show" : ""
      }`}
      tabIndex={0}
      role="button"
      onKeyDown={handleActivationKey}
      onKeyUp={handleActivationKey}
      onBlur={() => setIsActive(false)}
    >
      <Icon icon="info-circle" size={23} color="var(--color-accent)" />
      <div className="pointer-events-none absolute -left-[18rem] top-10 z-50 rounded-sm border bg-bg_dark p-2 text-xs opacity-0 transition-opacity group-hover:opacity-100 group-[&.show]:opacity-100">
        {props.children}
      </div>
    </div>
  );
}
