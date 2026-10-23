"use client";

import { Icon } from "@/components/shared";
import { useEffect, useId, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function InfoIcon({ children }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ left: 8, top: 8 });
  const tooltipId = useId();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const updatePosition = () => {
      const button = buttonRef.current;
      const tooltip = tooltipRef.current;

      if (!button || !tooltip) return;

      const buttonRect = button.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      const padding = 8;
      const gap = 8;

      let left = buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2;

      left = Math.max(
        padding,
        Math.min(left, window.innerWidth - tooltipRect.width - padding),
      );

      let top = buttonRect.bottom + gap;

      if (top + tooltipRect.height > window.innerHeight - padding) {
        top = buttonRect.top - tooltipRect.height - gap;
      }

      top = Math.max(
        padding,
        Math.min(top, window.innerHeight - tooltipRect.height - padding),
      );

      setPosition({ left, top });
    };

    const frame = requestAnimationFrame(updatePosition);

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isVisible, children]);

  return (
    <div
      className="relative ml-2 flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-describedby={isVisible ? tooltipId : undefined}
        className="rounded-full border-gray focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsVisible(false);
        }}
      >
        <Icon icon="info-circle" size={23} className="bg-gray" />
      </button>

      <div
        ref={tooltipRef}
        id={tooltipId}
        role="tooltip"
        style={{
          left: position.left,
          top: position.top,
        }}
        className={`bg-font-dark fixed z-50 w-max max-w-[calc(100vw-1rem)] break-words rounded-sm p-6 text-sm text-white transition-opacity ${
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
