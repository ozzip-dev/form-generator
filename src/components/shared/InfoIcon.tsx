"use client";

import { Icon } from "@/components/shared";

interface Props {
  children: React.ReactNode;
}

export default function InfoIcon(props: Props) {
  return (
    <div className="relative cursor-help">
      <div className="group inline-block">
        <Icon icon="info-circle" size={20} color="var(--color-accent)" />

        <div
          className="
            absolute 
            -left-[18rem] lg:left-[50%] top-10
             lg:-translate-x-1/2
            w-[20rem]
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
    </div>
  );
}
