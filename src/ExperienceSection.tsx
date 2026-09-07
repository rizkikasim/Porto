import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, ChevronDown, Sparkles } from 'lucide-react';

interface ExperienceItem {
  id: number;
  period: string;
  role: string;
  institution: string;
  description: string;
  tags: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 1,
    period: 'JUNI 2025 - AUGST 2025',
    role: 'Karya Multi Solution Indonesia',
    institution: 'Smart Building Project',
    description:
      'Contributed to the development of an ESP32-based Smart Building system integrated with advanced sensors. Focused on hardware-to-software integration, telemetry data collection, and optimizing local communication nodes for seamless automation.',
    tags: ['ESP32', 'IoT Integration', 'Telemetry Automation'],
  },
  {
    id: 2,
    period: 'FEB 2025 - DES 2025',
    role: 'Head Of Business Development',
    institution: 'Al-Fath',
    description:
      'Responsible for driving business growth and strategic partnerships.',
    tags: ['Strategic Partnership', 'Leadership'],
  },
  {
    id: 3,
    period: 'SEP 2025 - JUN 2026',
    role: 'Asistent Laboratorium Iot',
    institution: 'Telkom University',
    description:
      'Assisted in managing the IoT laboratory, supporting students with projects, and maintaining lab equipment.',
    tags: ['Lab Management', 'IoT Hardware', 'Mentoring'],
  },
  {
    id: 4,
    period: 'NOV 2025 - JAN 2026',
    role: 'Project Manager',
    institution: 'MQFM Company',
    description:
      'Led cross-functional teams to deliver projects on time and within budget, ensuring alignment with organizational goals and stakeholder expectations.',
    tags: ['Agile Coordination', 'Team Leadership', 'Stakeholder Management'],
  },
  {
    id: 5,
    period: 'FEB 2026 - MAR 2026',
    role: 'Frontend Developer',
    institution: 'Khadijah Islamic School',
    description:
      'Developed and maintained the frontend of the school’s website, ensuring a responsive and user-friendly interface for students, parents, and staff.',
    tags: ['Web Development', 'Responsive UI', 'Frontend Maintenance'],
  },
];

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // Default card pertama terbuka (bisa diset null jika ingin default tertutup semua)
  const [openCardId, setOpenCardId] = useState<number | null>(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleCard = (id: number) => {
    setOpenCardId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0f] to-[#121214] text-zinc-100 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-white/10 font-sans overflow-hidden"
    >
      {/* Glow ambient latar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -right-40 -z-10 h-[450px] w-[450px] rounded-full bg-[#cf8047]/5 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 -left-40 -z-10 h-[400px] w-[400px] rounded-full bg-[#cf8047]/5 blur-[150px]"
      />

      <div className="max-w-5xl mx-auto">
        {/* Header Eyebrow */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 pb-12 border-b border-white/10 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#cf8047] shadow-[0_0_8px_#cf8047]" />
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                Milestones & Trajectory
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Experience Journey
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Briefcase className="w-3.5 h-3.5 text-[#cf8047]" />
            <span>Interactive Milestones</span>
          </div>
        </div>

        {/* Collapsible Cards Container */}
        <div className="mt-12 sm:mt-16 space-y-4 sm:space-y-5">
          {EXPERIENCES.map((exp, idx) => {
            const isOpen = openCardId === exp.id;

            return (
              <div
                key={exp.id}
                className={`group rounded-2xl sm:rounded-3xl border transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? 'border-[#cf8047]/50 bg-gradient-to-b from-white/[0.05] to-white/[0.015] shadow-[0_10px_35px_rgba(0,0,0,0.5)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.035]'
                } ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {/* Header Clickable Row */}
                <button
                  type="button"
                  onClick={() => toggleCard(exp.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 select-none focus:outline-none"
                >
                  <div className="space-y-1.5 pr-2">
                    <h3 className="text-lg sm:text-2xl font-semibold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#cf8047] font-medium tracking-wide">
                      {exp.institution}
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 self-stretch md:self-center shrink-0">
                    {/* Pill Badge Periode */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-zinc-300 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[#cf8047]" />
                      <span>{exp.period}</span>
                    </div>

                    {/* Tombol Panah Buka Tutup (Chevron) */}
                    <div
                      className={`h-9 w-9 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#cf8047] border-[#cf8047] text-white shadow-[0_0_12px_rgba(207,128,71,0.5)]'
                          : 'bg-white/[0.03] text-zinc-400 group-hover:text-white group-hover:border-white/20'
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Body Collapsible: Animasi Buka/Tutup Menggunakan CSS Grid Transition */}
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 border-t border-white/5">
                      {/* Sub-Card Detail Box */}
                      <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-5 sm:p-6 space-y-5">
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                            Key Deliverables & Scope
                          </span>
                          <p className="mt-2 text-sm sm:text-base text-zinc-300 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>

                        {/* Tags di dalam Sub-Card */}
                        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#cf8047] mr-1 shrink-0" />
                          {exp.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-3 py-1 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-mono text-zinc-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;