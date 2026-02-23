"use client";

import { Icon } from "@/components/shared";

interface Props {
  children: React.ReactNode;
}

export default function InfoIcon(props: Props) {
  return (
    <div className="group relative ml-2 cursor-help">
      <Icon icon="info-circle" size={23} color="var(--color-accent)" />
      <div className="pointer-events-none absolute -left-[18rem] top-10 z-50 rounded-sm border bg-bg_dark p-2 text-xs opacity-0 transition-opacity group-hover:opacity-100">
        {props.children}
      </div>
    </div>
  );
}
