"use client";

import { useEffect, useState } from "react";
import { ButtonLink, Icon } from "@/components/shared";

type Props = {
  ids: string[];
};

const EditFormNavigation = ({ ids }: Props) => {
  const [activeId, setActiveId] = useState("header");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const updateActiveSection = () => {
      const line = window.innerHeight * 0.35;

      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= line && rect.bottom > line;
      });

      if (current) {
        setActiveId(current.id);
        return;
      }

      const next = sections.find(
        (section) => section.getBoundingClientRect().top > line,
      );

      setActiveId(next?.id ?? sections[sections.length - 1].id);
    };

    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    });

    sections.forEach((section) => observer.observe(section));
    updateActiveSection();

    return () => observer.disconnect();
  }, [ids]);

  return (
    <div>
      <div className="sticky top-0 hidden h-fit pt-8 md:grid">
        <ButtonLink
          variant="ghost"
          link="#header"
          className={`rounded-sm p-2 transition-colors ${
            activeId === "header" ? "bg-accent/10" : "hover:bg-white/50"
          }`}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
              activeId === "header"
                ? "border-accent bg-accent text-white"
                : "border-gray bg-white"
            }`}
          >
            <Icon
              icon="panel-top"
              size={15}
              className={activeId === "header" ? "bg-white" : "bg-accent"}
            />
          </div>
        </ButtonLink>

        {ids
          .filter((id) => id !== "header")
          .map((id) => {
            const active = activeId === id;

            return (
              <ButtonLink
                key={id}
                variant="ghost"
                link={`#${id}`}
                className={`rounded-sm p-2 transition-colors ${
                  active ? "bg-accent/10" : "hover:bg-white/50"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all ${
                    active
                      ? "scale-105 border-accent bg-accent font-semibold text-white"
                      : "border-gray bg-white"
                  }`}
                >
                  {id}
                </div>
              </ButtonLink>
            );
          })}
      </div>
    </div>
  );
};

export default EditFormNavigation;
