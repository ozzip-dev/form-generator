"use client";

import { ButtonLink } from "@/components/shared";
import { useRef, type PointerEvent } from "react";

const FACES = [
  { id: 1, label: "NIE", pos: "[transform:translateZ(calc(var(--s)/2))]" },
  {
    id: 2,
    label: "TAK",
    pos: "[transform:rotateY(180deg)_translateZ(calc(var(--s)/2))]",
  },
  {
    id: 3,
    label: "TAK",
    pos: "[transform:rotateY(90deg)_translateZ(calc(var(--s)/2))]",
  },
  {
    id: 4,
    label: "TAK",
    pos: "[transform:rotateY(-90deg)_translateZ(calc(var(--s)/2))]",
  },
  {
    id: 5,
    label: "GŁOS",
    pos: "[transform:rotateX(90deg)_translateZ(calc(var(--s)/2))]",
  },
  {
    id: 6,
    label: "GŁOS",
    pos: "[transform:rotateX(-90deg)_translateZ(calc(var(--s)/2))]",
  },
];

export default function HeroAnimation() {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative isolate overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,color-mix(in_srgb,var(--color-accent)_55%,#05070d)_0%,#070a12_72%)] py-20 text-white"
    >
      {/* shadows */}
      <div
        className="absolute -left-[10%] -right-[40%] -top-[45%] -z-10 h-[150%] origin-[50%_0] animate-[hero-sway_14s_ease-in-out_infinite_alternate] opacity-90 blur-[25px] [-webkit-mask-image:radial-gradient(ellipse_at_50%_0,#000_5%,transparent_68%)] [mask-image:radial-gradient(ellipse_at_50%_0,#000_5%,transparent_68%)] motion-reduce:animate-none"
        style={{
          background:
            "conic-gradient(from 148deg at 50% 0, transparent 0deg, transparent 18deg, color-mix(in srgb, var(--color-accent-light) 90%, transparent) 30deg, transparent 42deg, color-mix(in srgb, var(--color-accent) 95%, transparent) 54deg, transparent 66deg, color-mix(in srgb, var(--color-gray) 50%, transparent) 76deg, transparent 90deg, transparent 360deg)",
        }}
      />
      {/* net */}
      <div className="absolute inset-0 -z-10 [-webkit-mask-image:radial-gradient(ellipse_at_50%_30%,#000,transparent_70%)] [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_50%_30%,#000,transparent_70%)]" />

      {/* blobs */}
      <div className="bg-accent-dark absolute right-[7%] top-[0] -z-10 h-[400px] w-[400px] animate-[hero-f2_10s_ease-in-out_infinite_alternate] rounded-full blur-[100px] will-change-transform motion-reduce:animate-none" />
      <div className="absolute -bottom-[300px] left-[68%] -z-10 h-[520px] w-[520px] animate-[hero-f3_8s_ease-in-out_infinite_alternate] rounded-full bg-gray opacity-50 blur-[250px] will-change-transform motion-reduce:animate-none" />

      <div className="container md:flex">
        <div className="flex-1">
          <div className="text-xs text-white">
            FORMULARZE DLA ORGANIZACJI ZWIĄZKOWYCH
          </div>

          <h1 className="my-8 bg-clip-text text-2xl font-extrabold leading-tight text-transparent [background-image:linear-gradient(180deg,#fff_60%,var(--color-gray)_100%)]">
            Chcesz przeprowadzić wybory albo ankietę?
          </h1>

          <p className="text-md text-gray">
            Zbierz głosy i opinie online. Wyniki zobaczysz od razu, a dane
            zostają w Twojej organizacji.
          </p>

          <ButtonLink
            link="#templates"
            variant="empty-white"
            message="Zobacz gotowe szablony"
            className="mt-20 w-fit"
          />
        </div>

        <div className="flex flex-1 items-center justify-center">
          {/* kostka 3D */}
          <div
            aria-hidden="true"
            className="relative mb-20 mt-36 grid place-items-center [perspective:1100px] max-[800px]:h-[200px] md:mb-0 md:mt-0"
          >
            {/* <div className="animate-[hero-float_6s_ease-in-out_infinite] [transform-style:preserve-3d] motion-reduce:animate-none"> */}
            <div className="relative h-[var(--s)] w-[var(--s)] [--s:140px] [transform-style:preserve-3d] [transform:rotateX(-42deg)_rotateY(-45deg)]">
              {" "}
              <div className="absolute left-1/2 top-1/2 -ml-[45px] -mt-[45px] h-[90px] w-[90px] rounded-full bg-[radial-gradient(#fff,var(--color-accent_teal)_38%,transparent_70%)] blur-[8px]" />
              {FACES.map(({ label, pos }) => (
                <div
                  key={label}
                  className={`absolute inset-0 grid place-items-center rounded-[20px] border-4 border-gray text-[34px] font-extrabold leading-none tracking-[.06em] text-white backdrop-blur-[6px] [box-shadow:inset_0px_0px_74px_50px_rgba(247,247,247,0.05)] max-[900px]:text-[24px] ${pos}`}
                >
                  {label}
                </div>
              ))}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
