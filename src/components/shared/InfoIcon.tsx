"use client";

import { Icon } from "@/components/shared";

interface Props {
  children: React.ReactNode;
}

export default function InfoIcon(props: Props) {
  return (
    <div className="relative">
      <div className="group inline-block">
        <Icon
          icon="info-circle"
          size={20}
          className="cursor-pointer"
          color="var(--color-accent)"
        />

        <div
          className="
            absolute 
            bottom-full sm:-bottom-1/2 lg:bottom-full
            left-1/2 sm:left-[120%] lg:left-1/2
            -translate-x-1/2 sm:translate-x-0 lg:-translate-x-1/2
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
