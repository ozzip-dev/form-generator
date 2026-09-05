"use client";

import { useEffect } from "react";

const Hero = () => {
  function animate() {
    const heroCanvas = document.getElementById("heroCanvas");
    if (!(heroCanvas instanceof HTMLCanvasElement)) return;
    const context = heroCanvas.getContext("2d");
    if (!context) return;
    const canvas: HTMLCanvasElement = heroCanvas;
    const ctx: CanvasRenderingContext2D = context;
    let W = 0,
      H = 0,
      t = 0;

    const styles = getComputedStyle(document.documentElement);
    const getRgb = (property: string, fallback: number[]) =>
      styles.getPropertyValue(property).match(/\d+/g)?.map(Number) ?? fallback;
    const accent = getRgb("--acc", [192, 0, 0]);
    const dark = getRgb("--color-font_dark", [66, 66, 66]);
    const blobColor = (accentAmount: number) => {
      const shade = dark.map((channel, index) =>
        Math.round(channel + (accent[index] - channel) * accentAmount),
      );

      return { r: shade[0], g: shade[1], b: shade[2] };
    };

    /* Noise texture — generowana raz */
    const NS = 512;
    const nCV = document.createElement("canvas");
    nCV.width = nCV.height = NS;
    const nCtx = nCV.getContext("2d");
    if (!nCtx) return;
    const nImg = nCtx.createImageData(NS, NS);
    for (let i = 0; i < nImg.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      nImg.data[i] = nImg.data[i + 1] = nImg.data[i + 2] = v;
      nImg.data[i + 3] = 255;
    }
    nCtx.putImageData(nImg, 0, 0);
    let noisePat: CanvasPattern | null = null;

    /* 6 punktów kontrolnych — każdy sinusoidalnie dryfuje */
    const blobs = [
      {
        ox: 0.12,
        oy: 0.18,
        ax: 0.32,
        ay: 0.28,
        fx: 0.41,
        fy: 0.31,
        px: 0.0,
        py: 1.1,
        ...blobColor(1),
      },
      {
        ox: 0.82,
        oy: 0.14,
        ax: 0.28,
        ay: 0.32,
        fx: 0.35,
        fy: 0.47,
        px: 2.1,
        py: 0.4,
        ...blobColor(0.82),
      },
      {
        ox: 0.5,
        oy: 0.55,
        ax: 0.38,
        ay: 0.3,
        fx: 0.27,
        fy: 0.39,
        px: 4.0,
        py: 2.8,
        ...blobColor(0.68),
      },
      {
        ox: 0.78,
        oy: 0.62,
        ax: 0.3,
        ay: 0.26,
        fx: 0.38,
        fy: 0.29,
        px: 1.5,
        py: 0.9,
        ...blobColor(0.55),
      },
      {
        ox: 0.22,
        oy: 0.72,
        ax: 0.26,
        ay: 0.28,
        fx: 0.44,
        fy: 0.33,
        px: 3.2,
        py: 3.7,
        ...blobColor(0.42),
      },
      {
        ox: 0.6,
        oy: 0.12,
        ax: 0.34,
        ay: 0.22,
        fx: 0.31,
        fy: 0.52,
        px: 5.5,
        py: 1.8,
        ...blobColor(0.3),
      },
      {
        ox: 0.15,
        oy: 0.42,
        ax: 0.28,
        ay: 0.32,
        fx: 0.36,
        fy: 0.28,
        px: 2.8,
        py: 4.2,
        ...blobColor(0.18),
      },
    ];

    /* Low-res mesh canvas — interpolowany przez browser */
    const G = 28;
    const mCV = document.createElement("canvas");
    mCV.width = mCV.height = G;
    const meshContext = mCV.getContext("2d");
    if (!meshContext) return;
    const mCtx: CanvasRenderingContext2D = meshContext;

    function renderMesh() {
      const id = mCtx.createImageData(G, G);
      for (let row = 0; row < G; row++) {
        for (let col = 0; col < G; col++) {
          const nx = col / (G - 1),
            ny = row / (G - 1);
          let tr = 0,
            tg = 0,
            tb = 0,
            tw = 0;
          for (let b = 0; b < blobs.length; b++) {
            const bl = blobs[b];
            const bx = bl.ox + bl.ax * Math.sin(t * bl.fx + bl.px);
            const by = bl.oy + bl.ay * Math.sin(t * bl.fy + bl.py);
            const dx = nx - bx,
              dy = ny - by;
            const w = Math.exp(-(dx * dx + dy * dy) * 4.2);
            tr += bl.r * w;
            tg += bl.g * w;
            tb += bl.b * w;
            tw += w;
          }
          const i = (row * G + col) * 4;
          id.data[i] = tw > 0 ? (tr / tw) | 0 : dark[0];
          id.data[i + 1] = tw > 0 ? (tg / tw) | 0 : dark[1];
          id.data[i + 2] = tw > 0 ? (tb / tw) | 0 : dark[2];
          id.data[i + 3] = 255;
        }
      }
      mCtx.putImageData(id, 0, 0);
    }

    function resize() {
      const dpr = devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      noisePat = ctx.createPattern(nCV, "repeat");
    }

    function draw() {
      /* 1. Mesh gradient — upscaled z bilinear interpolation */
      renderMesh();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(mCV, 0, 0, W, H);

      /* 2. Grain — dwie warstwy dla matte feel */
      if (noisePat) {
        ctx.save();
        ctx.globalAlpha = 0.055;
        ctx.globalCompositeOperation = "overlay";
        ctx.fillStyle = noisePat;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = 0.038;
        ctx.globalCompositeOperation = "soft-light";
        ctx.fillStyle = noisePat;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      }

      /* 3. Vignette */
      const vig = ctx.createRadialGradient(
        W * 0.5,
        H * 0.45,
        H * 0.05,
        W * 0.5,
        H * 0.5,
        H * 0.95,
      );
      vig.addColorStop(0, "rgba(255,255,255,0)");
      vig.addColorStop(1, `rgba(${dark.join(",")},0.35)`);
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      t += 0.018;
      animationFrame = requestAnimationFrame(draw);
    }

    let animationFrame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    resize();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }

  useEffect(() => animate(), []);
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wrap">
        <canvas id="heroCanvas" />
        <div className="hero-inner lg:grid-cols-2">
          <div className="hero-text">
            <div className="hero-badge">Narzędzie dla związków zawodowych</div>
            <h1 className="hero">
              Ankiety, głosowania i formularze dla organizacji związkowych
            </h1>
            <p className="hero-sub">
              Aplikacja do zbierania opinii i organizowania głosowań online.
              Szybko, bezpiecznie, bez chaosu maili. Jeden system dla całej
              organizacji.
            </p>
            <div className="hero-btns">
              <a
                href="https://form-generator-test.sliplane.app/admin-contact"
                className="btn-primary-rounded"
              >
                Zarejestruj organizację
              </a>
            </div>
          </div>

          <div className="hero-visual-wrap hidden lg:flex">
            <svg
              viewBox="0 0 200 240"
              width="270"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="8"
                y="8"
                width="184"
                height="224"
                rx="16"
                fill="white"
                fillOpacity="0.18"
                stroke="white"
                strokeOpacity="0.35"
                strokeWidth="1.5"
              />
              <rect
                x="26"
                y="30"
                width="90"
                height="9"
                rx="4.5"
                fill="white"
                opacity="0.5"
              />
              <rect
                x="26"
                y="46"
                width="60"
                height="6"
                rx="3"
                fill="white"
                opacity="0.25"
              />
              <line
                x1="26"
                y1="64"
                x2="174"
                y2="64"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="1"
              />
              <rect
                x="26"
                y="74"
                width="148"
                height="22"
                rx="6"
                fill="white"
                fillOpacity="0.12"
                stroke="white"
                strokeOpacity="0.25"
                strokeWidth="1"
              />
              <rect
                x="36"
                y="82"
                width="60"
                height="5"
                rx="2.5"
                fill="white"
                opacity="0.3"
              />
              <rect
                x="26"
                y="104"
                width="148"
                height="22"
                rx="6"
                fill="white"
                fillOpacity="0.12"
                stroke="white"
                strokeOpacity="0.25"
                strokeWidth="1"
              />
              <rect
                x="36"
                y="112"
                width="44"
                height="5"
                rx="2.5"
                fill="white"
                opacity="0.3"
              />
              <circle
                cx="38"
                cy="146"
                r="6"
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                fill="white"
                fillOpacity="0.12"
              />
              <circle cx="38" cy="146" r="2.8" fill="white" opacity="0.65" />
              <rect
                x="50"
                y="142"
                width="50"
                height="5"
                rx="2.5"
                fill="white"
                opacity="0.35"
              />
              <circle
                cx="38"
                cy="164"
                r="6"
                stroke="white"
                strokeOpacity="0.3"
                strokeWidth="1.5"
                fill="none"
              />
              <rect
                x="50"
                y="160"
                width="64"
                height="5"
                rx="2.5"
                fill="white"
                opacity="0.2"
              />
              <circle
                cx="38"
                cy="182"
                r="6"
                stroke="white"
                strokeOpacity="0.3"
                strokeWidth="1.5"
                fill="none"
              />
              <rect
                x="50"
                y="178"
                width="40"
                height="5"
                rx="2.5"
                fill="white"
                opacity="0.2"
              />
              <rect
                x="26"
                y="200"
                width="148"
                height="24"
                rx="8"
                fill="white"
                fillOpacity="0.22"
                stroke="white"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              <rect
                x="66"
                y="209"
                width="68"
                height="5"
                rx="2.5"
                fill="white"
                opacity="0.55"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
