"use client";

import { Icon } from "@/components/shared";

interface Props {
  children: React.ReactNode;
}

export default function InfoIcon(props: Props) {
  return (
    <div className="relative group cursor-help ml-2">
      <Icon icon="info-circle" size={23} color="var(--color-accent)" />
      <div
        className="
            absolute 
            -left-[18rem] top-10
            bg-bg_dark  text-xs
            p-2 rounded-sm border
            transition-opacity
            pointer-events-none
            z-50
          opacity-0 group-hover:opacity-100 
          "
      >
        {props.children}
      </div>
    </div>

  );
}
