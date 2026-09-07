import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MapPin, Cpu } from 'lucide-react';
import {
  SiFlutter,
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiFigma,
} from 'react-icons/si';

interface TechTool {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TECH_TOOLS: TechTool[] = [
  { name: 'Flutter', icon: SiFlutter },
  { name: 'Laravel', icon: SiLaravel },
  { name: 'React.js', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Applied AI & IoT', icon: Cpu },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MySQL', icon: SiMysql },
  { name: 'Git', icon: SiGit },
  { name: 'GitHub', icon: SiGithub },
  { name: 'Figma', icon: SiFigma },
];

const FULL_NAME = 'MUHAMAD RIZKI KASIM';
const FULL_BIO =
  'Fresh graduate in Information Technology with a strong interest in system development and digital technologies. Experienced in academic and internship projects related to application development, system implementation, and technology solutions, with a solid understanding of programming fundamentals. Highly motivated to learn, adapt, and contribute while continuously developing technical and professional skills.';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedNameLength, setTypedNameLength] = useState(0);
  const [typedBioLength, setTypedBioLength] = useState(0);

  // Trigger animasi saat section terlihat di viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animasi Typewriter bertahap: Nama selesai -> Paragraf mulai
  useEffect(() => {
    if (!isVisible) return;

    if (typedNameLength < FULL_NAME.length) {
      const timer = setTimeout(() => {
        setTypedNameLength((prev) => prev + 1);
      }, 55);
      return () => clearTimeout(timer);
    } else if (typedBioLength < FULL_BIO.length) {
      const timer = setTimeout(() => {
        setTypedBioLength((prev) => Math.min(prev + 2, FULL_BIO.length));
      }, 18);
      return () => clearTimeout(timer);
    }
  }, [isVisible, typedNameLength, typedBioLength]);

  // Pemisahan nama eksplisit: "MUHAMAD RIZKI " (14 karakter) dan "KASIM" (5 karakter)
  const whitePart = FULL_NAME.slice(0, Math.min(typedNameLength, 14));
  const orangePart = typedNameLength > 14 ? FULL_NAME.slice(14, typedNameLength) : '';

  const isTypingName = isVisible && typedNameLength < FULL_NAME.length;
  const isTypingBio =
    isVisible &&
    typedNameLength >= FULL_NAME.length &&
    typedBioLength < FULL_BIO.length;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-gradient-to-b from-[#141416] via-[#0d0d0f] to-[#0a0a0a] text-zinc-100 pt-20 sm:pt-28 pb-20 border-t border-white/10 font-sans overflow-hidden"
    >
      {/* Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 -z-10 h-[380px] w-[700px] rounded-full bg-gradient-to-b from-[#cf8047]/15 to-transparent blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-40 -z-10 h-[450px] w-[450px] rounded-full bg-[#cf8047]/5 blur-[150px]"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* Header Eyebrow */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#cf8047] shadow-[0_0_8px_#cf8047]" />
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                Profile
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              About Me
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-[#cf8047]" />
            <span>Based in Bandung, ID</span>
          </div>
        </div>

        {/* Main Content: Foto Kiri + Bio Kanan */}
        <div className="pt-10 sm:pt-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Foto (Kiri) */}
          <div
            className={`lg:col-span-5 flex justify-center lg:justify-start lg:pt-3 transition-all duration-1000 delay-150 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="relative group w-full max-w-[340px] sm:max-w-[380px]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-900 shadow-2xl">
                <img
                  src="/P1360024.JPG"
                  alt="Muhamad Rizki Kasim"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Badge aksen bintang */}
              <div className="absolute -top-3 -right-3 p-2 rounded-xl border border-white/10 bg-[#141416]/90 backdrop-blur-md shadow-lg">
                <Sparkles className="w-4 h-4 text-[#cf8047]" />
              </div>
            </div>
          </div>

          {/* Bio (Kanan) */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center space-y-6 transition-all duration-1000 delay-300 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Menggunakan whitespace-pre agar spasi di antara RIZKI dan KASIM tidak terkompresi browser */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-snug min-h-[44px] flex items-center whitespace-pre flex-wrap">
              <span className="text-white">{whitePart}</span>
              <span className="text-[#cf8047]">{orangePart}</span>
              {isTypingName && (
                <span className="ml-1 inline-block w-1 h-7 sm:h-8 bg-[#cf8047] animate-pulse align-middle" />
              )}
            </h3>

            <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed min-h-[140px]">
              <p>
                {FULL_BIO.slice(0, typedBioLength)}
                {isTypingBio && (
                  <span className="ml-1 inline-block w-0.5 h-4 bg-[#cf8047] animate-pulse align-middle" />
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Tech Marquee Strip */}
      <div
        className={`relative w-full mt-2 py-6 border-y border-white/10 bg-white/[0.02] -rotate-1 sm:-rotate-2 scale-105 overflow-hidden transition-opacity duration-1000 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#0e0e10] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...TECH_TOOLS, ...TECH_TOOLS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center">
                <div className="flex items-center gap-3 px-5 text-zinc-400 hover:text-white transition-colors cursor-default whitespace-nowrap group">
                  <Icon className="w-5 h-5 text-zinc-400 group-hover:text-[#cf8047] transition-all duration-200 group-hover:scale-110 shrink-0" />
                  <span className="text-base sm:text-lg font-medium tracking-wide">
                    {item.name}
                  </span>
                </div>
                <span className="text-[#cf8047] text-xs px-2 opacity-70 select-none">
                  ✦
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;