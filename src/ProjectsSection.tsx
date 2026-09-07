import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'travel-kuy',
    title: 'Travel Kuy — Tour & Booking App',
    category: 'Mobile & Backend API',
    year: '2025',
    summary:
      'A streamlined travel booking platform engineered with a Flutter cross-platform front-end and a secure, role-based Laravel REST API with automated payment orchestration.',
    tech: ['Flutter', 'Laravel', 'REST API', 'MySQL'],
    image: '/travelkuy.png',
    githubUrl: 'https://github.com/kasim',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'mqfm-stream',
    title: 'MQFM Radio & Streaming Engine',
    category: 'Audio Streaming & CMS',
    year: '2025',
    summary:
      'Digital audio streaming mobile application coupled with a central station CMS. Engineered for low-latency live audio broadcasting, podcast library curation, and listener analytics.',
    tech: ['Flutter', 'Laravel', 'Audio Streaming', 'Tailwind CSS'],
    image: '/MQFM.png',
    githubUrl: 'https://github.com/kasim',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 'smart-building-iot',
    title: 'ESP32 Smart Telemetry Grid',
    category: 'Applied IoT & Automation',
    year: '2025',
    summary:
      'Embedded monitoring mesh built for real-time indoor environmental telemetry, automating sensor thresholds via MQTT/HTTP bridges to centralized data dashboards.',
    tech: ['ESP32', 'C++', 'MQTT', 'Laravel', 'IoT Sensors'],
    image: '/KMSI.png',
    githubUrl: 'https://github.com/kasim',
    featured: false,
  },
  {
    id: 'khadijah-school-web',
    title: 'Khadijah Islamic School Portal',
    category: 'Frontend',
    year: '2026',
    summary:
      'Responsive educational management portal designed with modern web interfaces, streamlining announcements, parent-teacher touchpoints, and academic resources.',
    tech: ['React.js', 'Tailwind CSS', 'Vite', 'UI/UX'],
    image: '/khadijah.png',
    liveUrl: '#',
    featured: false,
  },
];

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Mobile' | 'Web' | 'IoT'>('All');

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

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Mobile') return proj.tech.includes('Flutter');
    if (activeFilter === 'Web') return proj.tech.includes('React.js') || proj.tech.includes('Tailwind CSS');
    if (activeFilter === 'IoT') return proj.tech.includes('ESP32') || proj.tech.includes('IoT Sensors');
    return true;
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-gradient-to-b from-[#121214] via-[#0d0d0f] to-[#0a0a0a] text-zinc-100 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-white/10 font-sans overflow-hidden"
    >
      {/* Glow Ambient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-[800px] rounded-full bg-[#cf8047]/5 blur-[160px]"
      />

      <div className="max-w-7xl mx-auto">
        {/* Eyebrow & Filter Row */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#cf8047] shadow-[0_0_8px_#cf8047]" />
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                Portfolio Showcase
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Selected Works
            </h2>
          </div>

          {/* Filter Pill Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md self-start md:self-auto">
            {(['All', 'Mobile', 'Web', 'IoT'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFilter === tab
                    ? 'bg-[#cf8047] text-white shadow-[0_0_12px_rgba(207,128,71,0.4)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Project Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {filteredProjects.map((project, idx) => {
            const isSpanFull = project.featured;

            return (
              <div
                key={project.id}
                className={`group rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.035] to-white/[0.008] backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:border-[#cf8047]/40 hover:from-white/[0.06] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] ${
                  isSpanFull ? 'lg:col-span-12' : 'lg:col-span-6'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className={`grid grid-cols-1 ${isSpanFull ? 'lg:grid-cols-12 gap-8 lg:gap-10' : 'gap-6'}`}>
                  {/* Mockup / Image Card */}
                  <div
                    className={`relative w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-zinc-950 aspect-[16/10] ${
                      isSpanFull ? 'lg:col-span-7' : ''
                    }`}
                  >
                    {/* Fallback pattern / gradient placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1b1b1f] via-[#101012] to-[#0a0a0a] flex items-center justify-center">
                      <Layers className="w-12 h-12 text-white/10 group-hover:text-[#cf8047]/40 transition-colors duration-500" />
                    </div>

                    <img
                      src={project.image}
                      alt={project.title}
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                      className="relative h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Floating year badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full border border-white/15 bg-black/70 backdrop-blur-md text-[11px] font-mono text-zinc-300">
                      {project.year}
                    </div>
                  </div>

                  {/* Information & Action Content */}
                  <div className={`flex flex-col justify-between ${isSpanFull ? 'lg:col-span-5' : ''}`}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#cf8047] font-medium">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight leading-snug group-hover:text-zinc-100 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Tech Pills */}
                      <div className="pt-2 flex flex-wrap gap-2">
                        {project.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02] text-xs font-mono text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Links & CTAs */}
                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-all shadow-sm"
                        >
                          <span>Live Preview</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-zinc-300 hover:text-white hover:border-white/20 transition-all"
                        >
                          <SiGithub className="w-3.5 h-3.5" />
                          <span>Code Repository</span>
                        </a>
                      )}
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

export default ProjectsSection;