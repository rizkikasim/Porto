import React, { useEffect, useRef, useState } from 'react';

// --- Icons ---
const LogoMark = ({ className = "w-5 h-5", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill={color}>
    <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
  </svg>
);

const ArrowUpRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
  </svg>
);

const GridIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// --- Custom Hook Liquid Canvas Reveal ---
function useLiquidCanvas(containerRef: React.RefObject<HTMLDivElement | null>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const brushRadius = 143;
    const decay = 0.016;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Gambar after (kacamata / neon orange) yang direveal kuas
    const afterImg = new Image();
    afterImg.src = '/after.png';

    let width = 0;
    let height = 0;
    const coverCanvas = document.createElement('canvas');
    const coverCtx = coverCanvas.getContext('2d');

    const brushCanvas = document.createElement('canvas');
    const brushCtx = brushCanvas.getContext('2d');
    const radius = brushRadius * dpr;
    const diameter = Math.ceil(radius * 2);
    brushCanvas.width = diameter;
    brushCanvas.height = diameter;

    if (brushCtx) {
      const grad = brushCtx.createRadialGradient(radius, radius, 0, radius, radius, radius);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.55, 'rgba(255,255,255,0.82)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      brushCtx.fillStyle = grad;
      brushCtx.fillRect(0, 0, diameter, diameter);
    }

    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      coverCanvas.width = canvas.width;
      coverCanvas.height = canvas.height;

      if (coverCtx && afterImg.complete && afterImg.naturalWidth) {
        const scale = Math.max(coverCanvas.width / afterImg.naturalWidth, coverCanvas.height / afterImg.naturalHeight);
        const nw = afterImg.naturalWidth * scale;
        const nh = afterImg.naturalHeight * scale;
        coverCtx.drawImage(afterImg, (coverCanvas.width - nw) / 2, (coverCanvas.height - nh) / 2, nw, nh);
      }
    };

    afterImg.onload = resize;
    const ro = new ResizeObserver(resize);
    ro.observe(containerRef.current);

    let points: [number, number][] = [];
    let lastPoint: [number, number] | null = null;
    let idle = 0;
    let animId: number;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;

      if (x < -radius || y < -radius || x > canvas.width + radius || y > canvas.height + radius) {
        lastPoint = null;
        return;
      }

      if (lastPoint) {
        const dx = x - lastPoint[0];
        const dy = y - lastPoint[1];
        const dist = Math.hypot(dx, dy);
        const step = Math.max(radius * 0.3, 1);
        const n = Math.min(Math.ceil(dist / step), 60);

        for (let i = 1; i <= n; i++) {
          points.push([lastPoint[0] + (dx * i) / n, lastPoint[1] + (dy * i) / n]);
        }
      } else {
        points.push([x, y]);
      }
      lastPoint = [x, y];
    };

    window.addEventListener('pointermove', handlePointerMove);

    const render = () => {
      if (points.length > 0) {
        idle = 0;
      } else {
        idle++;
      }

      if (idle < 120) {
        const fade = points.length > 0 ? decay : Math.min(decay + idle * 0.004, 0.5);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = `rgba(0,0,0,${fade})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (points.length > 0 && coverCtx) {
          ctx.globalCompositeOperation = 'source-over';
          const tempStamp = document.createElement('canvas');
          tempStamp.width = diameter;
          tempStamp.height = diameter;
          const sCtx = tempStamp.getContext('2d');

          points.forEach(([px, py]) => {
            if (!sCtx) return;
            sCtx.clearRect(0, 0, diameter, diameter);
            sCtx.globalCompositeOperation = 'source-over';
            sCtx.drawImage(brushCanvas, 0, 0);
            sCtx.globalCompositeOperation = 'source-in';
            sCtx.drawImage(coverCanvas, px - radius, py - radius, diameter, diameter, 0, 0, diameter, diameter);

            ctx.drawImage(tempStamp, px - radius, py - radius);
          });
          points = [];
        }
      } else if (idle === 120) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, [containerRef]);

  return canvasRef;
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useLiquidCanvas(containerRef);

  const [time, setTime] = useState("9:41am");
  const [date, setDate] = useState("5 September, 2026");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const rawHours = now.getHours();
      const hours = rawHours % 12 || 12;
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const meridiem = rawHours >= 12 ? 'pm' : 'am';
      setTime(`${hours}:${minutes}${meridiem}`);

      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      setDate(`${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative isolate overflow-hidden rounded-b-card bg-[#0a0a0a] min-h-screen text-[#ffffff] select-none"
    >
      {/* 1. Base Layer Image (Monochrome Portrait) */}
      <img
        src="/before.png"
        alt="Rizki Kasim Portrait Monochrome"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* 2. Liquid Trail Reveal Layer (After Image / Warm Glow) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

      {/* 3. Contrast Vignette Overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/70" />


      {/* 5. Header Bar Overlay */}
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="max-w-[88rem] mx-auto flex items-center justify-between gap-6 p-5 sm:px-8 sm:py-7">
          <a href="#home" className="flex items-center gap-2 text-lg font-semibold tracking-tight hover:scale-105 transition-transform duration-300">
            <LogoMark className="w-5 h-5" color="#cf8047" />
            <span className="text-white">Kasim.dev</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/80">
            <a href="#home" className="text-white font-semibold hover:-translate-y-0.5 transition-transform">Home</a>
            <a href="#works" className="hover:text-white hover:-translate-y-0.5 transition-transform">Projects</a>
            <a href="#about" className="hover:text-white hover:-translate-y-0.5 transition-transform">About</a>
            <a href="#contact" className="hover:text-white hover:-translate-y-0.5 transition-transform">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* <div className="hidden md:flex items-center border border-white/15 bg-black/40 backdrop-blur-md rounded-xl px-3.5 py-2 gap-3 text-xs text-white/80 shadow-sm">
              <span className="text-white/45">Local time</span>
              <span className="tabular-nums font-medium text-white min-w-[3.5rem]">{time}</span>
              <span className="text-white/30">•</span>
              <span className="font-medium text-white">{date}</span>
            </div> */}

            <button className="flex items-center gap-1.5 border border-white/15 bg-black/40 backdrop-blur-md hover:bg-black/60 rounded-xl px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-all duration-300">
              <GridIcon />
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* 6. Content Grid */}
      <div className="relative z-20 max-w-[88rem] mx-auto flex flex-col justify-between min-h-screen pt-28 pb-16 px-5 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-10 lg:pt-36 lg:pb-16">
        
        {/* Empty Column Kiri (Memberikan ruang pandang untuk wajah di foto) */}
        <div className="hidden lg:block lg:col-span-5" />

        {/* Right Column: Heading & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start lg:items-end justify-center gap-7">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-sm font-medium text-white/70">
            <span className="w-2 h-2 rounded-full bg-accent-from animate-pulse" />
            Software Engineer & Web Developer
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.02] tracking-tight max-w-[18ch] text-white text-left lg:text-right">
            Muhamad Rizki Kasim.
          </h1>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-[34ch] text-left lg:text-right font-normal">
  Building modern applications through elegant <span className="text-white font-medium">Flutter</span> interfaces, robust <span className="text-white font-medium">Laravel</span> backends, and applied I/IoT research.
</p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full bg-white text-ink py-1.5 pl-6 pr-1.5 text-sm font-medium hover:scale-[1.04] transition-transform duration-300 group"
            >
              <span>Explor Project</span>
              <span className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                <ArrowUpRight />
              </span>
            </a>

            <a
              href="#works"
              className="inline-flex items-center rounded-full border border-white/20 bg-black/30 backdrop-blur-sm hover:bg-white/10 text-white py-3 px-7 text-sm font-medium hover:scale-[1.04] transition-all duration-300"
            >
              Download Resume
            </a>
          </div>
        </div>

      </div>

      {/* 7. Bottom Status Bar */}
      {/* <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-[88rem] mx-auto flex items-center justify-between p-5 sm:px-8 text-xs font-medium uppercase tracking-wider text-white/60">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Open for opportunities
          </span>
          <span className="hidden sm:inline">Based in Bandung, Indonesia</span>
          <span className="inline-flex items-center gap-2">
            Scroll to explore <span>↓</span>
          </span>
        </div>
      </div> */}
    </section>
  );
}